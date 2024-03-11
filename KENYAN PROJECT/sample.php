<?php
session_start();
include('dbconnect.php');

// Retrieve form data
$Name = $_POST['Name'] ?? null;
$Phone = $_POST['Phone'] ?? null;
$DonationType = $_POST['DonationType'] ?? null;
$FoodDetails = $_POST['Food'] ?? null;
$FoodLocation = $_POST['FoodLocation'] ?? null;
$ClothesDetails = $_POST['Clothes'] ?? null;
$ClothesLocation = $_POST['ClothesLocation'] ?? null;
$mpesaDetails = $_POST['mpesaDetails'] ?? null;
$Amount = $_POST['Amount'] ?? null;

// Prepare SQL statement to insert data into database
$stmt = $conn->prepare("INSERT INTO donation(`Name`, `Phone`, `DonationType`, `FoodDetails`, `FoodLocation`, `ClothesDetails`, `ClothesLocation`, `mpesaDetails`, `Amount`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

// Bind parameters
$stmt->bind_param("sssssssss", $Name, $Phone, $DonationType, $FoodDetails, $FoodLocation, $ClothesDetails, $ClothesLocation, $mpesaDetails, $Amount);

// Execute the statement
if ($stmt->execute() === TRUE) {
    echo "Donation submitted successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and the connection
$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donation Form</title>
    <link rel="stylesheet" href="sample.css">
</head>
<body>

<h1>Donation Form</h1>

<div class="container">
    <form id="donationForm" action="sample.php" method="post">
        <label for="Name"> Name:</label><br>
        <input type="text" id="Name" name="Name" placeholder="Your Name" required><br>

        <label for="Phone">PhoneNumber:</label><br>
        <input type="text" id="Phone" name="Phone" placeholder="Your Phone Number" required><br><br>

        <label for="DonationType">Select Donation Type:</label><br>
        <select id="DonationType" name="DonationType" required>
            <option value="">Choose...</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="mpesa">M-Pesa</option>
        </select><br><br>

        <div id="FoodDetails" class="donationDetails">
            <label for="Food">Food Donation Details:</label><br>
            <input type="text" id="food" name="Food" placeholder="Food Donation Details"><br>

            <label for="FoodLocation">Pick-up Point for Food:</label><br>
            <input type="text" id="FoodLocation" name="FoodLocation" placeholder="Pick-up Point for Food"><br>
        </div>

        <div id="ClothesDetails" class="donationDetails">
            <label for="Clothes">Clothes Donation Details:</label><br>
            <input type="text" id="clothes" name="Clothes" placeholder="Clothes Donation Details"><br>

            <label for="ClothesLocation">Pick-up Point for Clothes:</label><br>
            <input type="text" id="ClothesLocation" name="ClothesLocation" placeholder="Pick-up Point for Clothes"><br>
        </div>

        <div id="mpesaDetails" class="donationDetails">
            <label for="MpesaPhoneNumber">M-Pesa Phone Number:</label><br>
            <input type="text" id="mpesaDetails" name="MpesaPhoneNumber" placeholder="Your M-Pesa Phone Number"><br>

            <label for="Amount">Amount (in Ksh):</label><br>
            <input type="number" id="Amount" name="Amount" placeholder="Enter donation amount in Ksh"><br>
        </div>

        <input type="submit" value="Submit Donation">
    </form>
</div>
<script src="sample.js"></script>
</body>
</html>
