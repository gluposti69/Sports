#!/usr/bin/env python3
import requests
import json
import time
import sys
from datetime import datetime

# Base URL from frontend/.env
BASE_URL = "https://bcd21fba-9ba3-4cf5-9d88-4be63a3e9915.preview.emergentagent.com/api"

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

def test_api_health():
    """Test 1: Basic API Health Check"""
    try:
        response = requests.get(f"{BASE_URL}/")
        
        if response.status_code == 200:
            data = response.json()
            expected_message = "BlueCheck Inspections API is running"
            
            if data.get("message") == expected_message:
                log_test("API Health Check", True, f"API is running. Response: {data}")
                return True
            else:
                log_test("API Health Check", False, 
                         f"API responded but with unexpected message. Expected: '{expected_message}', Got: '{data.get('message')}'",
                         data)
        else:
            log_test("API Health Check", False, 
                     f"API health check failed with status code: {response.status_code}",
                     response.json() if response.text else None)
    except Exception as e:
        log_test("API Health Check", False, f"Exception occurred: {str(e)}")
    
    return False

def test_contact_inquiry_creation():
    """Test 2: Contact Inquiry Creation with valid data"""
    try:
        # Valid test data
        valid_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "phone": "0412345678",
            "property_address": "123 Collins Street, Melbourne VIC 3000",
            "inspection_type": "pre-purchase",
            "preferred_date": "2024-01-15",
            "message": "Looking for a comprehensive pre-purchase inspection"
        }
        
        response = requests.post(f"{BASE_URL}/contact/inquiry", json=valid_data)
        
        if response.status_code == 200:
            data = response.json()
            
            # Check if response has expected fields
            if "id" in data and "message" in data and "status" in data:
                if data["status"] == "success":
                    log_test("Contact Inquiry Creation", True, 
                             f"Successfully created inquiry with ID: {data['id']}",
                             data)
                    return data["id"]  # Return ID for further testing
                else:
                    log_test("Contact Inquiry Creation", False, 
                             f"Inquiry created but status is not 'success': {data['status']}",
                             data)
            else:
                log_test("Contact Inquiry Creation", False, 
                         "Response missing expected fields (id, message, or status)",
                         data)
        else:
            log_test("Contact Inquiry Creation", False, 
                     f"Failed to create inquiry. Status code: {response.status_code}",
                     response.json() if response.text else None)
    except Exception as e:
        log_test("Contact Inquiry Creation", False, f"Exception occurred: {str(e)}")
    
    return None

def test_contact_inquiry_validation():
    """Test 3: Contact Inquiry Validation with invalid data"""
    validation_tests = [
        {
            "name": "Missing Name Field",
            "data": {
                "email": "test@example.com",
                "phone": "0412345678",
                "property_address": "123 Test St",
                "inspection_type": "pre-purchase"
            },
            "expected_status": 422  # Validation error
        },
        {
            "name": "Missing Email Field",
            "data": {
                "name": "Test User",
                "phone": "0412345678",
                "property_address": "123 Test St",
                "inspection_type": "pre-purchase"
            },
            "expected_status": 422
        },
        {
            "name": "Invalid Email Format",
            "data": {
                "name": "Test User",
                "email": "invalid-email",
                "phone": "0412345678",
                "property_address": "123 Test St",
                "inspection_type": "pre-purchase"
            },
            "expected_status": 422
        },
        {
            "name": "Missing Phone Field",
            "data": {
                "name": "Test User",
                "email": "test@example.com",
                "property_address": "123 Test St",
                "inspection_type": "pre-purchase"
            },
            "expected_status": 422
        },
        {
            "name": "Missing Property Address",
            "data": {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "0412345678",
                "inspection_type": "pre-purchase"
            },
            "expected_status": 422
        },
        {
            "name": "Invalid Inspection Type",
            "data": {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "0412345678",
                "property_address": "123 Test St",
                "inspection_type": "invalid-type"
            },
            "expected_status": 422
        }
    ]
    
    all_passed = True
    
    for test in validation_tests:
        try:
            response = requests.post(f"{BASE_URL}/contact/inquiry", json=test["data"])
            
            if response.status_code == test["expected_status"]:
                log_test(f"Validation Test: {test['name']}", True, 
                         f"Received expected status code {test['expected_status']}")
            else:
                log_test(f"Validation Test: {test['name']}", False, 
                         f"Expected status code {test['expected_status']}, got {response.status_code}",
                         response.json() if response.text else None)
                all_passed = False
        except Exception as e:
            log_test(f"Validation Test: {test['name']}", False, f"Exception occurred: {str(e)}")
            all_passed = False
    
    return all_passed

def test_contact_inquiry_retrieval(inquiry_id=None):
    """Test 4: Contact Inquiry Retrieval"""
    all_passed = True
    
    # Test listing all inquiries
    try:
        response = requests.get(f"{BASE_URL}/contact/inquiries")
        
        if response.status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                log_test("List All Inquiries", True, 
                         f"Successfully retrieved {len(data)} inquiries")
            else:
                log_test("List All Inquiries", False, 
                         "Response is not a list of inquiries",
                         data)
                all_passed = False
        else:
            log_test("List All Inquiries", False, 
                     f"Failed to retrieve inquiries. Status code: {response.status_code}",
                     response.json() if response.text else None)
            all_passed = False
    except Exception as e:
        log_test("List All Inquiries", False, f"Exception occurred: {str(e)}")
        all_passed = False
    
    # Test retrieving a specific inquiry if we have an ID
    if inquiry_id:
        try:
            response = requests.get(f"{BASE_URL}/contact/inquiry/{inquiry_id}")
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get("id") == inquiry_id:
                    log_test("Retrieve Specific Inquiry", True, 
                             f"Successfully retrieved inquiry with ID: {inquiry_id}")
                else:
                    log_test("Retrieve Specific Inquiry", False, 
                             f"Retrieved inquiry has incorrect ID. Expected: {inquiry_id}, Got: {data.get('id')}",
                             data)
                    all_passed = False
            else:
                log_test("Retrieve Specific Inquiry", False, 
                         f"Failed to retrieve inquiry. Status code: {response.status_code}",
                         response.json() if response.text else None)
                all_passed = False
        except Exception as e:
            log_test("Retrieve Specific Inquiry", False, f"Exception occurred: {str(e)}")
            all_passed = False
    
    return all_passed

def test_contact_statistics():
    """Test 5: Contact Statistics"""
    try:
        response = requests.get(f"{BASE_URL}/contact/stats")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check if response has expected fields
            expected_fields = ["total_inquiries", "status_breakdown", 
                              "inspection_type_breakdown", "recent_inquiries_7_days"]
            
            missing_fields = [field for field in expected_fields if field not in data]
            
            if not missing_fields:
                log_test("Contact Statistics", True, 
                         "Successfully retrieved contact statistics with all expected fields",
                         data)
                return True
            else:
                log_test("Contact Statistics", False, 
                         f"Response missing expected fields: {', '.join(missing_fields)}",
                         data)
        else:
            log_test("Contact Statistics", False, 
                     f"Failed to retrieve statistics. Status code: {response.status_code}",
                     response.json() if response.text else None)
    except Exception as e:
        log_test("Contact Statistics", False, f"Exception occurred: {str(e)}")
    
    return False

def test_data_persistence():
    """Test 6: Data Persistence with multiple inquiries"""
    # Create multiple inquiries with different inspection types
    inquiry_ids = []
    
    inspection_types = ["pre-purchase", "new-home"]
    
    for i, inspection_type in enumerate(inspection_types):
        try:
            data = {
                "name": f"Test User {i+1}",
                "email": f"test{i+1}@example.com",
                "phone": f"04{i+1}2345678",
                "property_address": f"{i+1}23 Test Street, Sydney NSW 2000",
                "inspection_type": inspection_type,
                "preferred_date": "2024-02-15",
                "message": f"Test message for {inspection_type} inspection"
            }
            
            response = requests.post(f"{BASE_URL}/contact/inquiry", json=data)
            
            if response.status_code == 200:
                inquiry_id = response.json().get("id")
                if inquiry_id:
                    inquiry_ids.append(inquiry_id)
                    log_test(f"Create {inspection_type} Inquiry", True, 
                             f"Created inquiry with ID: {inquiry_id}")
                else:
                    log_test(f"Create {inspection_type} Inquiry", False, 
                             "Response missing ID field",
                             response.json())
            else:
                log_test(f"Create {inspection_type} Inquiry", False, 
                         f"Failed to create inquiry. Status code: {response.status_code}",
                         response.json() if response.text else None)
        except Exception as e:
            log_test(f"Create {inspection_type} Inquiry", False, f"Exception occurred: {str(e)}")
    
    # If we created at least one inquiry, verify it persists
    if inquiry_ids:
        # Wait a moment to ensure data is saved
        time.sleep(1)
        
        # Verify each inquiry exists
        all_persisted = True
        for inquiry_id in inquiry_ids:
            try:
                response = requests.get(f"{BASE_URL}/contact/inquiry/{inquiry_id}")
                
                if response.status_code == 200:
                    data = response.json()
                    
                    if data.get("id") == inquiry_id:
                        log_test(f"Verify Persistence of Inquiry {inquiry_id}", True, 
                                 "Inquiry data persisted correctly")
                    else:
                        log_test(f"Verify Persistence of Inquiry {inquiry_id}", False, 
                                 f"Retrieved inquiry has incorrect ID. Expected: {inquiry_id}, Got: {data.get('id')}",
                                 data)
                        all_persisted = False
                else:
                    log_test(f"Verify Persistence of Inquiry {inquiry_id}", False, 
                             f"Failed to retrieve inquiry. Status code: {response.status_code}",
                             response.json() if response.text else None)
                    all_persisted = False
            except Exception as e:
                log_test(f"Verify Persistence of Inquiry {inquiry_id}", False, f"Exception occurred: {str(e)}")
                all_persisted = False
        
        # Check if statistics reflect the new inquiries
        try:
            response = requests.get(f"{BASE_URL}/contact/stats")
            
            if response.status_code == 200:
                stats = response.json()
                
                # We should have at least as many inquiries as we just created
                if stats.get("total_inquiries", 0) >= len(inquiry_ids):
                    log_test("Verify Statistics Update", True, 
                             f"Statistics reflect the created inquiries. Total count: {stats.get('total_inquiries')}",
                             stats)
                else:
                    log_test("Verify Statistics Update", False, 
                             f"Statistics don't reflect all created inquiries. Expected at least: {len(inquiry_ids)}, Got: {stats.get('total_inquiries', 0)}",
                             stats)
                    all_persisted = False
            else:
                log_test("Verify Statistics Update", False, 
                         f"Failed to retrieve statistics. Status code: {response.status_code}",
                         response.json() if response.text else None)
                all_persisted = False
        except Exception as e:
            log_test("Verify Statistics Update", False, f"Exception occurred: {str(e)}")
            all_persisted = False
        
        return all_persisted
    else:
        log_test("Data Persistence", False, "Could not create any inquiries to test persistence")
        return False

def test_email_functionality():
    """Test 7: Email Functionality with Gmail App Password"""
    try:
        # Test data specifically for email testing
        email_test_data = {
            "name": "Email Test Customer",
            "email": "test.customer@example.com",
            "phone": "0498765432",
            "property_address": "456 Email Test Lane, Melbourne VIC 3000",
            "inspection_type": "new-home",
            "preferred_date": "2024-01-20",
            "message": "Testing email functionality with App Password"
        }
        
        print("\n----- Testing Email Functionality -----")
        print(f"Submitting test inquiry with data: {json.dumps(email_test_data, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/contact/inquiry", json=email_test_data)
        
        if response.status_code == 200:
            data = response.json()
            inquiry_id = data.get("id")
            
            print(f"Inquiry created successfully with ID: {inquiry_id}")
            print(f"API Response: {json.dumps(data, indent=2)}")
            
            # Check if the response message mentions email confirmation
            email_mentioned = "email" in data.get("message", "").lower()
            
            if email_mentioned:
                print("✓ API response includes email confirmation message")
            else:
                print("✗ API response does not mention email confirmation")
            
            # Verify the inquiry was saved to the database
            verify_response = requests.get(f"{BASE_URL}/contact/inquiry/{inquiry_id}")
            
            if verify_response.status_code == 200:
                print("✓ Inquiry was successfully saved to database")
                
                # Email functionality can only be fully verified by checking logs
                # or by actually receiving the emails, but we can check if the API
                # processed the request without errors
                log_test("Email Functionality Test", True, 
                         "Inquiry was created and saved to database. Check logs for email sending status.",
                         {"inquiry_id": inquiry_id, "api_response": data})
                
                return inquiry_id
            else:
                log_test("Email Functionality Test", False, 
                         "Inquiry was created but could not be retrieved from database",
                         {"inquiry_id": inquiry_id, "verification_status": verify_response.status_code})
        else:
            log_test("Email Functionality Test", False, 
                     f"Failed to create inquiry for email test. Status code: {response.status_code}",
                     response.json() if response.text else None)
    except Exception as e:
        log_test("Email Functionality Test", False, f"Exception occurred: {str(e)}")
    
    return None

def run_all_tests():
    """Run all tests in sequence"""
    print("\n===== STARTING BACKEND API TESTS =====\n")
    print(f"Testing API at: {BASE_URL}\n")
    
    # Test 1: API Health Check
    api_health = test_api_health()
    
    if not api_health:
        print("\n❌ API health check failed. Stopping tests.")
        return False
    
    # Test 2: Contact Inquiry Creation
    inquiry_id = test_contact_inquiry_creation()
    
    # Test 3: Contact Inquiry Validation
    test_contact_inquiry_validation()
    
    # Test 4: Contact Inquiry Retrieval
    test_contact_inquiry_retrieval(inquiry_id)
    
    # Test 5: Contact Statistics
    test_contact_statistics()
    
    # Test 6: Data Persistence
    test_data_persistence()
    
    # Test 7: Email Functionality
    test_email_functionality()
    
    # Print summary
    print("\n===== TEST SUMMARY =====")
    print(f"Total Tests: {test_results['passed'] + test_results['failed']}")
    print(f"Passed: {test_results['passed']}")
    print(f"Failed: {test_results['failed']}")
    
    return test_results['failed'] == 0

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)