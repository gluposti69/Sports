# 🔍 Google Ads Tracking Verification Guide

## 🚀 **Method 1: Real-Time Browser Testing (Instant Results)**

### **Step 1: Install Google Tag Assistant**
1. Go to Chrome Web Store
2. Search for "Google Tag Assistant Legacy"
3. Install the browser extension
4. Pin it to your toolbar

### **Step 2: Test Your Website**
1. **Open your website** in a new tab
2. **Click the Tag Assistant icon** in your toolbar
3. **Click "Enable"** to start monitoring
4. **Refresh your website page**

### **What You Should See:**
✅ **Google Ads tag firing** - Shows your GTM-5632TGN9 ID
✅ **No errors** - Green checkmarks for all tags
✅ **Page view tracked** - Confirms basic tracking works

### **Step 3: Test Conversions Live**
1. **With Tag Assistant still enabled**:
   - Click "Book Your Inspection" button (should show CTA conversion)
   - Click "Call Now" button (should show phone conversion)
   - Fill out and submit contact form (should show form conversion)

2. **Tag Assistant will show**:
   - Conversion events firing in real-time
   - Event parameters (value, currency, etc.)
   - Any errors or issues

---

## 🔍 **Method 2: Browser Developer Tools (Technical Verification)**

### **Step 1: Open Developer Console**
1. **Right-click** on your website
2. **Select "Inspect"** or press **F12**
3. **Go to "Console" tab**

### **Step 2: Check for Google Ads Loading**
1. **Refresh the page**
2. **Look for messages** like:
   ```
   Google Analytics initialized
   gtag loaded successfully
   ```
3. **No error messages** about gtag or Google Ads

### **Step 3: Test Conversions Manually**
1. **In the console, type**:
   ```javascript
   window.gtag('event', 'conversion', {
     'send_to': 'GTM-5632TGN9/test_conversion',
     'value': 1,
     'currency': 'AUD'
   });
   ```
2. **Press Enter**
3. **If successful**: No errors in console
4. **If failed**: Error messages will appear

### **Step 4: Verify Functions Exist**
**Type in console**:
```javascript
console.log(typeof window.gtag); // Should show "function"
console.log(typeof window.trackFormSubmission); // Should show "function"
console.log(typeof window.trackConversion); // Should show "function"
```

---

## 📊 **Method 3: Google Ads Dashboard (Real Conversion Data)**

### **Step 1: Access Google Ads**
1. **Log into** your Google Ads account
2. **Go to**: Tools & Settings → Conversions
3. **Look for** conversions from your website

### **Step 2: Check Conversion Actions**
**You should see conversions with names like**:
- `form_submission`
- `phone_call` 
- `cta_click`
- Or default conversion names

### **Step 3: Test with Real Actions**
1. **Submit your contact form** with test data
2. **Wait 2-24 hours** (Google Ads has a delay)
3. **Check conversions dashboard** for new entries

### **What You'll See**:
✅ **Conversion count increases**
✅ **Source/Medium**: Your website domain
✅ **Conversion time**: When you tested
✅ **Conversion value**: 1 AUD (as configured)

---

## 🧪 **Method 4: Live Form Testing (End-to-End)**

### **Complete Workflow Test:**

1. **Fill out your contact form** with test data:
   ```
   Name: Test Customer
   Email: test@yourdomain.com
   Phone: 0400000000
   Address: 123 Test Street, Melbourne VIC 3000
   Type: Pre-Purchase Inspection
   Message: Testing Google Ads tracking
   ```

2. **Submit the form**

3. **What should happen**:
   ✅ Form submits successfully
   ✅ Success toast appears
   ✅ You receive business notification email
   ✅ Test email gets confirmation email
   ✅ Google Ads conversion fires (check with Tag Assistant)

### **Verification Checklist**:
- [ ] Form submission works
- [ ] Email notifications sent
- [ ] Success message displays
- [ ] Tag Assistant shows conversion
- [ ] No console errors

---

## 📱 **Method 5: Mobile Testing**

### **Test on Mobile Device:**
1. **Open website** on your phone
2. **Use mobile Chrome** with Tag Assistant
3. **Test all conversions**:
   - Tap "Call Now" (should dial and track)
   - Tap "Book Inspection" (should track CTA)
   - Fill contact form (should track submission)

### **Mobile-Specific Checks**:
✅ **Floating buttons work** on mobile
✅ **Form submission works** on mobile
✅ **Phone calls track** when tapping call button
✅ **No mobile-specific errors**

---

## ⚡ **Quick Verification Commands**

### **Test in Browser Console** (Copy & Paste):

```javascript
// Test 1: Check if Google Ads is loaded
console.log('Google Ads loaded:', typeof window.gtag === 'function');

// Test 2: Check custom functions
console.log('Form tracking:', typeof window.trackFormSubmission === 'function');
console.log('Conversion tracking:', typeof window.trackConversion === 'function');

// Test 3: Fire a test conversion
if (window.gtag) {
  window.gtag('event', 'conversion', {
    'send_to': 'GTM-5632TGN9/manual_test',
    'value': 1,
    'currency': 'AUD',
    'transaction_id': 'test_' + Date.now()
  });
  console.log('Test conversion fired!');
}

// Test 4: Check dataLayer
console.log('DataLayer:', window.dataLayer);
```

---

## 🚨 **Common Issues & Solutions**

### **Issue 1: Tag Assistant Shows No Tags**
**Solution**:
- Refresh the page with Tag Assistant enabled
- Clear browser cache and try again
- Check if ad blockers are interfering

### **Issue 2: Console Errors About gtag**
**Solution**:
- Verify internet connection
- Check if Google services are blocked
- Try incognito/private browsing mode

### **Issue 3: Conversions Not Showing in Google Ads**
**Solutions**:
- Wait 24-48 hours (Google Ads has delays)
- Check date range in Google Ads dashboard
- Verify conversion actions are set up in Google Ads account

### **Issue 4: Form Tracking Not Working**
**Solutions**:
- Check browser console for errors
- Verify form submission is successful first
- Test with Tag Assistant during form submission

---

## ✅ **Success Indicators**

### **✅ Everything Working Correctly When You See**:

1. **Tag Assistant**:
   - Green checkmarks for all tags
   - Conversion events firing on actions
   - No error messages

2. **Browser Console**:
   - No gtag errors
   - Functions return "function" type
   - Test conversions fire without errors

3. **Google Ads Dashboard**:
   - Conversion counts increasing
   - Conversion sources showing your website
   - Conversion values showing 1 AUD

4. **Website Functionality**:
   - Form submissions work normally
   - Emails are sent correctly
   - Phone clicks work on mobile
   - All buttons are responsive

---

## 🎯 **Pro Testing Tips**

### **Best Testing Practices**:

1. **Use Incognito Mode** - Prevents cache issues
2. **Test Different Devices** - Desktop, mobile, tablet
3. **Test Different Browsers** - Chrome, Safari, Firefox
4. **Use Real Data** - Avoid obvious test data
5. **Wait for Email Confirmations** - Ensures full workflow

### **What NOT to Do**:
❌ Don't click your own ads repeatedly
❌ Don't use fake/spam email addresses  
❌ Don't test excessively (can skew data)
❌ Don't expect instant Google Ads data

---

## 📞 **Need Help?**

### **If Verification Fails**:
1. **Check this guide step-by-step**
2. **Try different browsers/devices**
3. **Clear cache and cookies**
4. **Wait 24-48 hours for Google Ads data**
5. **Contact Google Ads support** if issues persist

### **Working Correctly Means**:
✅ Tags loading without errors
✅ Conversions firing on user actions
✅ Form submission workflow complete
✅ Email notifications working
✅ Mobile functionality working

**Your tracking is ready to capture real customer conversions!** 🚀
