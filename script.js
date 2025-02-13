document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the values of the input fields
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var feedback = document.getElementById("feedback").value;

    // Process the data and display the result
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Feedback submitted successfully!";

    // Store feedback in Excel file
    storeFeedbackInExcel(name, email, feedback);
});

function storeFeedbackInExcel(name, email, feedback) {
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.aoa_to_sheet([
        ["Name", "Email", "Feedback"],
        [name, email, feedback]
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback");

    var filename = "feedback.xlsx";

    try {
        XLSX.writeFile(workbook, filename);
        console.log("Feedback stored in " + filename);
    } catch (error) {
        console.error("Error storing feedback:", error);
    }
}