
async function getAccessToken() {
    const response = await fetch("https://api.thefoodassembly.com/oauth/v2/token", {
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "body": "grant_type=password&client_id=" + process.env.MINI_RUCHE_CLIENT_ID + "&username=" + process.env.MINI_RUCHE_USERNAME + "&password=" + process.env.MINI_RUCHE_PASSWORD,
        "method": "POST",
    });
    const {access_token} = await response.json();
    return access_token;
}
async function getOrderCount() {
    const response = await fetch("https://api.thefoodassembly.com/miniruche/admin/" + process.env.MINI_RUCHE_NAME, {
        "credentials": "include",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + await getAccessToken(),
        },
    });
    const {sales} = await response.json();
    if (sales && sales.length > 0 && !sales[0].isPaused) {
        console.log("Ordercount of sale " + sales[0].id + ": " + sales[0].orderCount)
        return sales[0].orderCount;
    } else {
        console.log("No sales found")
        return null;
    }
}


export  {getOrderCount}