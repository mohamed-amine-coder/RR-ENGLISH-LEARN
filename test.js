var user = {
    name: "mohamed amine el ajimi",
    role: "admin",
    courses: ["Learn", "Speak", "Practice"],
    prices: ["Free", "Paid", "Premium"],
    userType: "teacher",
}
function capitalizeWords(str) {
    console.log(`User Name: ${user.name}`);
    console.log(`User Role: ${capitalizeWords(user.role)}`);
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
capitalizeWords(user.role);