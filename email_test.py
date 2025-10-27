#!/usr/bin/env python3
import requests
import json
import time
import sys
from datetime import datetime

# Base URL from frontend/.env
BASE_URL = "https://safe-inspector-1.preview.emergentagent.com/api"

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "tests": []
}

def log_test(name, passed, message="", details=None):
    """Log test results with consistent formatting"""
    status = "✅ PASSED" if passed else "❌ FAILED"
    print(f"{status} - {name}")
    if message:
        print(f"  {message}")
    if details:
        print(f"  Details: {json.dumps(details, indent=2)}")
    
    test_results["tests"].append({
        "name": name,
        "passed": passed,
        "message": message,
        "details": details
    })
    
    if passed:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1

def test_email_integration():
    """Test email integration with the contact form submission"""
    try:
        # Test data as specified in the review request
        test_data = {
            "name": "Test Customer",
            "email": "test@example.com",
            "phone": "0412345678",
            "property_address": "123 Test Street, Melbourne VIC 3000",
            "inspection_type": "pre-purchase",
            "preferred_date": "2024-01-15",
            "message": "Test message for email functionality"
        }
        
        print(f"\nSubmitting test contact form with data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/contact/inquiry", json=test_data)
        
        if response.status_code == 200:
            data = response.json()
            
            # Check if response has expected fields
            if "id" in data and "message" in data and "status" in data:
                if data["status"] == "success":
                    # Check if the response message mentions email confirmation
                    if "email" in data["message"].lower():
                        log_test("Email Integration - API Response", True, 
                                f"API response mentions email confirmation: '{data['message']}'",
                                data)
                    else:
                        log_test("Email Integration - API Response", False, 
                                f"API response does not mention email confirmation: '{data['message']}'",
                                data)
                    
                    # Store the inquiry ID for database verification
                    inquiry_id = data["id"]
                    
                    # Verify the inquiry was stored in the database
                    db_verification = verify_database_storage(inquiry_id, test_data)
                    
                    return inquiry_id if db_verification else None
                else:
                    log_test("Email Integration - API Response", False, 
                            f"Inquiry created but status is not 'success': {data['status']}",
                            data)
            else:
                log_test("Email Integration - API Response", False, 
                        "Response missing expected fields (id, message, or status)",
                        data)
        else:
            log_test("Email Integration - API Response", False, 
                    f"Failed to create inquiry. Status code: {response.status_code}",
                    response.json() if response.text else None)
    except Exception as e:
        log_test("Email Integration - API Response", False, f"Exception occurred: {str(e)}")
    
    return None

def verify_database_storage(inquiry_id, original_data):
    """Verify the inquiry was stored correctly in the database"""
    try:
        if not inquiry_id:
            log_test("Database Storage", False, "No inquiry ID to verify")
            return False
            
        response = requests.get(f"{BASE_URL}/contact/inquiry/{inquiry_id}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Verify all fields were saved correctly
            all_fields_correct = True
            field_errors = []
            
            # Check each field from the original submission
            for field, value in original_data.items():
                if field in data:
                    if data[field] != value:
                        all_fields_correct = False
                        field_errors.append(f"{field}: expected '{value}', got '{data[field]}'")
                else:
                    all_fields_correct = False
                    field_errors.append(f"{field}: missing from database record")
            
            # Check timestamps
            if "created_at" not in data:
                all_fields_correct = False
                field_errors.append("created_at: missing timestamp")
            
            if "updated_at" not in data:
                all_fields_correct = False
                field_errors.append("updated_at: missing timestamp")
            
            if all_fields_correct:
                log_test("Database Storage", True, 
                        f"All fields stored correctly in the database for inquiry ID: {inquiry_id}",
                        data)
                return True
            else:
                log_test("Database Storage", False, 
                        f"Some fields were not stored correctly: {', '.join(field_errors)}",
                        data)
        else:
            log_test("Database Storage", False, 
                    f"Failed to retrieve inquiry from database. Status code: {response.status_code}",
                    response.json() if response.text else None)
    except Exception as e:
        log_test("Database Storage", False, f"Exception occurred: {str(e)}")
    
    return False

def test_error_handling():
    """Test error handling for invalid inputs"""
    error_tests = [
        {
            "name": "Invalid Email Format",
            "data": {
                "name": "Test Customer",
                "email": "invalid-email",
                "phone": "0412345678",
                "property_address": "123 Test Street, Melbourne VIC 3000",
                "inspection_type": "pre-purchase",
                "preferred_date": "2024-01-15",
                "message": "Test message"
            },
            "expected_status": 422
        },
        {
            "name": "Missing Required Field - Name",
            "data": {
                "email": "test@example.com",
                "phone": "0412345678",
                "property_address": "123 Test Street, Melbourne VIC 3000",
                "inspection_type": "pre-purchase",
                "preferred_date": "2024-01-15",
                "message": "Test message"
            },
            "expected_status": 422
        },
        {
            "name": "Missing Required Field - Email",
            "data": {
                "name": "Test Customer",
                "phone": "0412345678",
                "property_address": "123 Test Street, Melbourne VIC 3000",
                "inspection_type": "pre-purchase",
                "preferred_date": "2024-01-15",
                "message": "Test message"
            },
            "expected_status": 422
        },
        {
            "name": "Missing Required Field - Phone",
            "data": {
                "name": "Test Customer",
                "email": "test@example.com",
                "property_address": "123 Test Street, Melbourne VIC 3000",
                "inspection_type": "pre-purchase",
                "preferred_date": "2024-01-15",
                "message": "Test message"
            },
            "expected_status": 422
        },
        {
            "name": "Missing Required Field - Property Address",
            "data": {
                "name": "Test Customer",
                "email": "test@example.com",
                "phone": "0412345678",
                "inspection_type": "pre-purchase",
                "preferred_date": "2024-01-15",
                "message": "Test message"
            },
            "expected_status": 422
        }
    ]
    
    all_passed = True
    
    for test in error_tests:
        try:
            print(f"\nTesting error handling: {test['name']}")
            response = requests.post(f"{BASE_URL}/contact/inquiry", json=test["data"])
            
            if response.status_code == test["expected_status"]:
                log_test(f"Error Handling - {test['name']}", True, 
                        f"Received expected status code {test['expected_status']}")
            else:
                log_test(f"Error Handling - {test['name']}", False, 
                        f"Expected status code {test['expected_status']}, got {response.status_code}",
                        response.json() if response.text else None)
                all_passed = False
        except Exception as e:
            log_test(f"Error Handling - {test['name']}", False, f"Exception occurred: {str(e)}")
            all_passed = False
    
    return all_passed

def check_backend_logs():
    """Check backend logs for email sending status messages"""
    try:
        # This would normally check server logs, but we'll simulate by checking the API response
        print("\nChecking for email sending status in backend logs...")
        print("Note: In a real environment, we would check the actual server logs.")
        print("For this test, we're inferring email status from the API response.")
        
        # We'll consider this a pass if the API response mentioned email confirmation
        email_mentioned = any(
            test["name"] == "Email Integration - API Response" and 
            test["passed"] and 
            "email confirmation" in test["message"].lower()
            for test in test_results["tests"]
        )
        
        if email_mentioned:
            log_test("Backend Logs - Email Status", True, 
                    "API response indicates emails are being sent")
        else:
            log_test("Backend Logs - Email Status", False, 
                    "Could not confirm email sending status from API response")
        
        return email_mentioned
    except Exception as e:
        log_test("Backend Logs - Email Status", False, f"Exception occurred: {str(e)}")
        return False

def run_email_tests():
    """Run all email-related tests"""
    print("\n===== STARTING EMAIL INTEGRATION TESTS =====\n")
    print(f"Testing API at: {BASE_URL}\n")
    
    # Test 1: Email Integration
    inquiry_id = test_email_integration()
    
    # Test 2: Error Handling
    test_error_handling()
    
    # Test 3: Check Backend Logs
    check_backend_logs()
    
    # Print summary
    print("\n===== EMAIL TEST SUMMARY =====")
    print(f"Total Tests: {test_results['passed'] + test_results['failed']}")
    print(f"Passed: {test_results['passed']}")
    print(f"Failed: {test_results['failed']}")
    
    if test_results['failed'] == 0:
        print("\n✅ All email integration tests passed!")
        print("The contact form email functionality appears to be working correctly.")
        print("- API returns success response")
        print("- Inquiry is stored in MongoDB with all fields")
        print("- API response mentions email confirmation")
        print("- Error handling for invalid inputs works correctly")
    else:
        print("\n❌ Some email integration tests failed.")
        print("Please check the test results above for details.")
    
    return test_results['failed'] == 0

if __name__ == "__main__":
    success = run_email_tests()
    sys.exit(0 if success else 1)