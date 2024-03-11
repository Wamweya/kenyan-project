document.addEventListener("DOMContentLoaded", function() {
    const donationForm = document.getElementById("donationForm");
    const DonationType = document.getElementById("DonationType");
    const FoodDetails = document.getElementById("FoodDetails");
    const ClothesDetails = document.getElementById("ClothesDetails");
    const mpesaDetails = document.getElementById("mpesaDetails");
    const MpesaPhoneNumber = document.getElementById("MpesaPhoneNumber"); // Get the MpesaPhoneNumber input field

    // Hide all donation details initially
    FoodDetails.style.display = "none";
    ClothesDetails.style.display = "none";
    mpesaDetails.style.display = "none";

    // Show donation details based on selected donation type
    DonationType.addEventListener("change", function() {
        const selectedOption = DonationType.value;
        if (selectedOption === "food") {
            FoodDetails.style.display = "block";
            ClothesDetails.style.display = "none";
            mpesaDetails.style.display = "none";
        } else if (selectedOption === "clothes") {
            FoodDetails.style.display = "none";
            ClothesDetails.style.display = "block";
            mpesaDetails.style.display = "none";
        } else if (selectedOption === "mpesa") {
            FoodDetails.style.display = "none";
            ClothesDetails.style.display = "none";
            mpesaDetails.style.display = "block";
        } else {
            FoodDetails.style.display = "none";
            ClothesDetails.style.display = "none";
            mpesaDetails.style.display = "none";
        }
    });

    // Form submission handling
    donationForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(donationForm);

        // Send form data to the server using AJAX
        fetch("sample.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            console.log("Server response:", data);
            // Optionally, reset the form after successful submission
            donationForm.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle errors here
        });
    });

    // Function to initiate M-Pesa payment
    function initiateMpesaPayment(data) {
        // M-Pesa API endpoint
        const mpesaApiEndpoint = "https://api.mpesa.com/payment/v1/payment";

        // M-Pesa API JSON data
        const mpesaData = {
            "BusinessShortCode": 174379,
            "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMzEwMTMzNzUw",
            "Timestamp": "20240310133750",
            "TransactionType": "CustomerPayBillOnline",
            "Amount": 1,
            "PartyA": mpesaDetails.value, // Use the value from the MpesaPhoneNumber input field
            "PartyB": 254797084980, // Receiver's phone number
            "PhoneNumber": MpesaPhoneNumber.value, // Use the value from the MpesaPhoneNumber input field
            "CallBackURL": "https://mydomain.com/path",
            "AccountReference": "CompanyXLTD",
            "TransactionDesc": "Payment of X"
        };

        // Send M-Pesa related data to the server using AJAX
        fetch(mpesaApiEndpoint, {
            method: "POST",
            body: JSON.stringify(mpesaData),
            headers: {
                "Authorization": "Basic dW9EM2JlNkRFemdaejgzWDFTQWZrYjlmQXV6bUdsWVlOT1g2NFVwUGVENGNsUDBDOnhIOEoyRXpZSUdtc29rMWdURDBlRzVzRUhzOU80MFNpN0JYVlhDZnpON01uYjlBWVFndEhwOElwbXB6TzdvTWc=",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            console.log("Initiating M-Pesa payment with data:", data);
            // Optionally, reset the form after successful M-Pesa initiation
            donationForm.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle errors here
        });
    }
});
