//import library
const readLine = require("node:readline");
//initialize readline|
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//faithLift class
class FaithLift {
    constructor(appName) {
        this.appName = appName;
        this.records = [];
        this.ID = 1;
        this.userLoginName = "";
        this.columnName = "";
    }

 //====================================================================================================userLogin=====================================================================================
 userLogin() {
    const page = `
                  ${this.appName}
        ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
            Created by: Rapp Micco Rizo
            Uplift Batch 28 - Momentum

                L O G I N  P A G E

        [1]-Login   [2]-Create an Account   [3]-Exit
    `;

    console.log(page);
    //user will choose action 
    rl.question("Choose an action: ", (answer) => {
        switch (answer) {
            case "1":
                console.clear();
                console.log("✅ Login Page!");
                this.authUser();
                break;

            case "2":
                console.clear();
                console.log("✅ User Registration!");
                this.userRegistration();
                break;

            case "3":
                console.clear();
                this.closeApp();
                rl.close();
                break;

            default:
                console.clear();
                console.log("❌ Invalid Option\n");
                this.userLogin();
        }
    });
 }
//=====================================================================================================login User=====================================================================================
authUser() {
    const page = `
                  ${this.appName}
        ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
            Created by: Rapp Micco Rizo
            Uplift Batch 28 - Momentum

                L O G I N  P A G E
    `;

    console.log(page);

    rl.question("📌 Please enter your username: ", (userName) => {
        rl.question("📌 Please enter your password: ", (passWord) => {
            //check credentials 
            let validateCredentials = this.records.find(user => user.Username.toLowerCase() === userName.toLowerCase());
            let validatePw = this.records.find(user => user.Password.toLowerCase() === passWord.toLowerCase());
            //validate credentials
            if (userName === "" || passWord === "") {
                console.clear();
                console.log("⚠️  Please fill in all required fields!")
                this.authUser();
            } else if (validateCredentials && validatePw){
                console.log("");
                console.log("[1]-Login   [2]-Cancel");
                console.log("");
                //user will choose action
                rl.question("Choose an action: ", (answer) => {
                    switch (answer) {
                        case "1":
                            console.clear();
                            console.log("✅ Login successfully!");
                            this.userLoginName = userName;
                            this.homePage(); //call home page
                            break;

                        case "2":
                            console.clear();
                            this.userLogin();
                            break;
                            
                        default:
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.authUser();
                    }
                });
            } else {
                console.clear();
                console.log("❌ Incorrect username or password!");
                this.authUser();
            }
        });
    });

}

 //====================================================================================user registration======================================================================================
 userRegistration() {
    const page = `
                  ${this.appName}
        ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
            Created by: Rapp Micco Rizo
            Uplift Batch 28 - Momentum

         C r e a t e  a n  A c c o u n t      
    `;

    console.log(page);

    rl.question("📌 Please enter your username: ", (userName) => {
         rl.question("📌 Please enter your password: ", (passWord) => {
             rl.question("📌 Please enter you first name: ", (firstName) => {
                 rl.question("📌 Please enter your last name: ", (lastName) => {
                     rl.question("📌 Please enter your address: ", (address) => {
                        //error message for incomplete details
                           if (userName === "" || 
                               passWord === "" || 
                               firstName === "" || 
                               lastName === "" || 
                               address === "") {
                               console.clear();
                               console.log("⚠️  Please complete all required details!");
                               this.userRegistration();
                               } else {
                                    console.log("");
                                    console.log("[1]-Save   [2]-Cancel");
                                    console.log("");
                               }
                        rl.question("Choose an action: ", (answer) => {
                            switch (answer) {
                                case "1":
                                    let newData = {
                                        Id: this.ID++,
                                        Username: userName,
                                        Password: passWord,
                                        Firstname: firstName,
                                        Lastname: lastName,
                                        Address: address,
                                    };
                                    //check if username is existing
                                    let existingUserName = this.records.find(user => user.Username.toLowerCase() === userName.toLowerCase());
                                    if (existingUserName) {
                                        console.clear();
                                        console.log("❌ Username already existed! Please try another one!");
                                        this.ID--;
                                        this.userRegistration();
                                    } else {
                                        this.records.push(newData);
                                        console.clear();
                                        console.log("✅ Data saved successfully!");
                                        this.userLogin();   
                                    }
                                    break;
                                case "2":
                                    console.clear();
                                    this.userLogin();
                                    break;

                                default:
                                    console.clear();
                                    console.log("❌ Invalid Option\n");
                                    this.userRegistration();
                            }
                        });
                     });
                 });
             }); 
         });
     }); 
}

//==================================================================================Home Page================================================================================
homePage() {
    const page = `
                   ${this.appName}
        ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
            Created by: Rapp Micco Rizo
            Uplift Batch 28 - Momentum

                   H O M E  P A G E
Hi, ${this.userLoginName.toUpperCase()}! 

    [1]-God's Word   [2]-List of Users    [3]-Logout
    `;

    console.log(page);

    rl.question("Choose an action: ", (answer) => {
        switch (answer) { 
            case "1":
                console.clear();
                this.rightPath();
                break;

            case "2":
                console.clear();
                this.userList();
                break;

            case "3":
                console.clear();
                console.log("✅ You have been logged out!");
                this.userLogin();
                break;

            default:
                console.clear();
                console.log("❌ Invalid Option\n");
                this.homePage();
        }
    });
}

//====================================================================================List of Users===========================================================================
userList() {
    const page = `
                     ${this.appName}
            ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
                Created by: Rapp Micco Rizo
                Uplift Batch 28 - Momentum

                  L I S T  O F  U S E R S
        `;

    console.log(page);

    //display list of users
    if (this.records.length !== 0) 
    {
        console.table(this.records);

        console.log("\n[1]-Update   [2]-Delete   [3]-Back to Home Page");

        rl.question("\nChoose an action: ", (answer) => {
            switch (answer) {
                case "1":
                rl.question(`\nAre you sure you want to update? 
                                \n[1]-Yes   [2]-No 
                                \nChoose an action: `, (answer) => {
                        switch (answer) {
                            case "1":
                                console.clear();
                                this.updateUserDetails();
                                break;

                            case "2":
                                console.clear();
                                this.userList();
                                break;

                            default:
                                console.clear();
                                console.log("❌ Invalid Option\n");
                                this.userList();

                        }
                    });
                    break;

                case "2"://=================delete=================
                    rl.question(`\nAre you sure you want to delete? 
                                \n[1]-Yes   [2]-No 
                                \nChoose an action: `, (answer) => {
                        switch (answer) {
                            case "1":
                                console.clear();
                                this.deleteUserDetails();
                                break;

                            case "2":
                                console.clear();
                                this.userList();
                                break;

                            default:
                                console.clear();
                                console.log("❌ Invalid Option\n");
                                this.userList();
                        }
                    });
                    break;

                case "3":
                    console.clear();
                    this.homePage();
                    break;
                
                default:
                    console.clear();
                    console.log("❌ Invalid Option");
                    this.userList();               
            }
        });
    } else {
        this.noUserData();
    }
}

//====================================================================================update user list=================================================================================
updateUserDetails() {
    const page = `
                    ${this.appName}
            ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
                Created by: Rapp Micco Rizo
                Uplift Batch 28 - Momentum

          U P D A T E  U S E R  D E T A I L S
        `;

        console.log(page);

        console.table(this.records);

         rl.question("\nPlease enter index you want to update: ", (index) => {
            if (index === "" || index < 0 || index >= this.records.length) {
                console.log("❌  Invalid index! Please select a valid number.");
                this.updateUserDetails();
            } else {
                //store the data that need to update
                let indexData = this.records[Number(index)];
               //store selected index details inside variable
                let selectedData = {
                    Id : indexData.Id, 
                    Username: indexData.Username, 
                    Password: indexData.Password,
                    Firstname: indexData.Firstname,
                    Lastname: indexData.Lastname,
                    Address: indexData.Address,
                }
                //display selected records
                console.table(selectedData);
                //user will choose what column that need to update
                console.log("");
                console.log("List of column: \n[1]-Username   [2]-Password   [3]-Firstname   [4]-Lastname   [5]-Address");
                console.log("");
                
                rl.question("Which column would you like to modify: ", (answer) => {
                    switch (answer) {
                        case "1":
                            answer = "Username";
                            rl.question(`Please enter your new ${answer}: `, (newUserName) => {
                                this.updateData(index, answer, newUserName);                           
                            });
                            break;
                            
                        case "2":
                            answer = "Password";
                            rl.question(`Please enter your new ${answer}: `, (newPassWord) => {
                            this.updateData(index, answer, newPassWord);                           
                            });
                            break;

                        case "3":
                            answer = "Firstname";
                            rl.question(`Please enter your new ${answer}: `, (newFirstName) => {
                            this.updateData(index, answer, newFirstName);                           
                            });
                            break;

                        case "4":
                            answer = "Lastname";
                            rl.question(`Please enter your new ${answer}: `, (newLastName) => {
                            this.updateData(index, answer, newLastName);                           
                            });
                            break;

                        case "5":
                            answer = "Address";
                            rl.question(`Please enter your new ${answer}: `, (newAddress) => {
                            this.updateData(index, answer, newAddress);                           
                            });
                            break;

                        default:
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.updateUserDetails();
                    }
                });
            }           
        });
}

//=====================================================================update index details (Username, Password, Firstname, Lastname, Address)==========================================================================================
updateData(index, answer, newData) {
   let result = this.records[index][answer] = newData; 
   let resultBool = Boolean(result);//convert to boolean

   if (resultBool) {
        console.clear();
        console.log("✅ Updated successfully.");
        console.table(this.records);
        //ask the user if they want to modify again
        console.log("\nDo you want to modify other data? \n[1]-Yes [2]-No");
        rl.question("\nChoose an action: ", (answer) => {
            switch (answer) {
                case "1":
                    console.clear();
                    console.log("✅ You can now modify again.");
                    this.updateUserDetails(); 
                    break;

                case "2":
                    console.clear();
                    this.userList();
                    break;

                default:
                    console.clear();
                    console.log("❌ Invalid Option\n");
                    this.updateUserDetails();
            }
        });
   } else {
        console.clear();
        console.log(`❌  Error: Check update ${answer} function`);
        this.updateUserDetails();
   }
}

//=====================================================================delete details of selected index=============================================================================================================
deleteUserDetails() {
    const page = `
                      ${this.appName}
            ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
                Created by: Rapp Micco Rizo
                Uplift Batch 28 - Momentum

           D E L E T E  U S E R  D E T A I L S
        `;

        console.log(page);
        //display user list if records length > 0
        if (this.records.length !== 0) 
        {
            //display records
            console.table(this.records);

            rl.question("\nPlease enter index you want to delete: ", (index) => {
                if (index !== "" && (index >= 0 && index < this.records.length)) { 
                    this.deleteData(index);
                } else {
                    console.clear();
                    console.log("❌  Invalid index! Please select a valid number.");
                    this.deleteUserDetails();
                }
            });   
        } else {
            this.noUserData();
        }    
}

//=====================================================================Delete index details (Username, Password, Firstname, Lastname, Address)==========================================================================================
deleteData(index) {
    this.records.splice(index, 1);
    console.clear();
    console.log(`✅  Index: ${index} deleted successfully!`);
    //display user list if records length > 0
    if (this.records.length !== 0) {
        console.log("\n                    N E W  L I S T  O F  U S E R");
        console.table(this.records);

        console.log("Do you want to delete other index? \n[1]-Yes   [2]-No ");
        rl.question("\nChoose an action: ", (answer) => {
            switch (answer) {
                case "1":               
                console.clear();
                console.log("✅ Delete user list\n");
                this.deleteUserDetails();
                break;

                case "2":
                console.clear();
                console.log("✅ User List\n");
                this.userList();
                break;

                default:
                    console.clear();
                    console.log("❌ Invalid Option\n");
                    this.userList();
            }
        });
    } else {
        this.noUserData();
    }   
}

//=========================================================================no data====================================================================
noUserData() {
    console.log(`                 =============================
                ||           N O             ||
                ||         D A T A           ||
                ||        F O U N D!         ||
                 =============================`);

    console.log("\n[1]-Back to Home Page");
    rl.question("\nChoose an action:", (answer) => {
        switch (answer) {
            case "1":
                console.clear();
                this.homePage();
                break;

            default:
                console.clear();
                console.log("❌ Invalid Option\n");
                this.userList();
        }
    });
}

//=======================================================================GOD'S WORD==================================================================
rightPath() {
        const  page = `                                   ${this.appName}
                        ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
                              Created by: Rapp Micco Rizo
                              Uplift Batch 28 - Momentum

              F A I T H  V E R S E S  T O  L I F T  Y O U R  S P I R I T

                                ⛧°。 ⋆༺♱༻⋆。 °⛧                                      
                                        
                                  ✞ ❤︎ 𝓖𝓞𝓓 ❤︎ ✞
                            ✞ ❤︎ Welcome,  ${this.userLoginName.toUpperCase()} ❤︎ ✞
                                                                               
                                ⛧°。 ⋆༺♱༻⋆。 °⛧


[1]-Proceed        [2]-Cancel
`;
        console.log(page);

        rl.question("Choose an action: ", (answer) => {
            switch (answer) {
                case "1":
                    console.clear();
                    console.log(`𓆩†𓆪 ✨ Hi, ${this.userLoginName.toUpperCase()}. I want you to know that you're on the right path.🙏 𓆩†𓆪\n`);
                    this.beginJourney();
                    break;

                case "2":
                    console.clear();
                    console.log(`𓆩†𓆪 😇 Hi, ${this.userLoginName.toUpperCase()}. Don't be discouraged. ✨ 𓆩†𓆪\n`);
                    this.dontAfraid();
                    break;

                default:
                    console.clear();
                    console.log("❌ Invalid Option\n");
                    this.rightPath();
            }
        });
}
//=============================================================Dont be Afraid============================================================================
dontAfraid() {
                                                    const  page = `                                                                                    ${this.appName}
                                                                        ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
                                                                            Created by: Rapp Micco Rizo
                                                                            Uplift Batch 28 - Momentum

                                                                            D O N ' T  B E  A F R A I D

                                                                                ⛧°。 ⋆༺♱༻⋆。 °⛧                                      
                                                                                        
                                                                            ✞ ❤︎ 𝓖𝓞𝓓 IS WITH YOU ❤︎ ✞
                                                                                                                            
                                                                                ⛧°。 ⋆༺♱༻⋆。 °⛧

${"\x1b[3m"}"𓆩†𓆪 📓 So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand. ✝️  𓆩†𓆪” \n— Isaiah 41:10"${"\x1b[0m"}

                                                                    [1]-I will try!        [2]-Cancel
              `;

    console.log(page);
    rl.question("\nChoose an action: ", (answer) => {
        switch (answer) {
            case "1":
                console.clear();
                console.log(`😇 ✝️  Glad you're back, ${this.userLoginName.toUpperCase()}! God is waiting for you.\n`);
                this.rightPath();
                break;

            case "2":
                console.clear();
                console.log(`𓆩†𓆪 😇 Hi, ${this.userLoginName.toUpperCase()}. I know you're lost and confused, but don't forget - God is there, waiting to help you.🙏 𓆩†𓆪\n`);
                this.homePage();
                break;

            default:
                console.clear();
                console.log("❌ Invalid Option\n");
                this.dontAfraid();
        }
    });
    
}

//===========================================================BEGIN JOURNEY==============================================================
beginJourney() {
    const  page = `                                   ${this.appName}
                        ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
                              Created by: Rapp Micco Rizo
                              Uplift Batch 28 - Momentum

                         B E G I N  Y O U R  J O U R N E Y

                                ⛧°。 ⋆༺♱༻⋆。 °⛧                                      
                                        
                                  ✞ ❤︎ 𝓖𝓞𝓓 ❤︎ ✞
                                                                               
                                ⛧°。 ⋆༺♱༻⋆。 °⛧
                `;
    console.log(page);

    console.log("[1]-Continue   [2]-Cancel");
    rl.question("\nChoose an action: ", (answer) => {
        switch (answer) {
            case "1":
                console.log(`\n𓆩†𓆪 😇 Hi, ${this.userLoginName.toUpperCase()}. I'm here to help and encourage you in times of many problems, struggles and challenges. ✨ 𓆩†𓆪`);
                console.log("\n[1]-Continue");
                //continue
                rl.question("\nChoose an action: ", (input) =>{
                   if (input === "1") {
                     console.clear();
                     this.feelingToday();
                   } else {
                    console.clear();
                    console.log("❌ Invalid Option\n");
                    this.beginJourney();
                   }
                });
                break;

            case "2":
                console.clear();
                console.log(`𓆩†𓆪 😇 Hi, ${this.userLoginName.toUpperCase()}. Don't be discouraged. ✨ 𓆩†𓆪\n`);
                this.dontAfraid();
                break;

            default:
                console.clear();
                console.log("❌ Invalid Option\n");
                this.beginJourney();
        }
    });
}

//=========================================================How are you feeling to day?========================================
feelingToday() {
    const  page = `                                   ${this.appName}
                        ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
                              Created by: Rapp Micco Rizo
                              Uplift Batch 28 - Momentum

                         B E G I N  Y O U R  J O U R N E Y

                                ⛧°。 ⋆༺♱༻⋆。 °⛧                                      
                                        
                                  ✞ ❤︎ 𝓖𝓞𝓓 ❤︎ ✞
                                                                               
                                ⛧°。 ⋆༺♱༻⋆。 °⛧
                `;

    console.log(page);

    rl.question("\nAre you feeling good today? \n[1]-Yes   [2]-No   [3]-Back to home page \nChoose an action: ", (answer) => {
        switch (answer) {
            case "1":
                console.clear();
                this.emotion(answer);
                break;

            case "2":
                console.clear();
                this.emotion(answer);
                break;

            case "3":
                console.clear();
                console.log(`𓆩†𓆪 😇 Remember: ${this.userLoginName.toUpperCase()}, God is with you. ✨🙏𓆩†𓆪`);
                this.homePage();
                break;

            default:
                console.clear();
                console.log("❌ Invalid Option\n");
                this.beginJourney();   
        }
    });

}     
//===================================================choose emotion=======================================================
emotion(input) {
    const  page = `                                   ${this.appName}
                        ${"\x1b[3m"}"Uplifting words for a weary heart"${"\x1b[0m"}
                              Created by: Rapp Micco Rizo
                              Uplift Batch 28 - Momentum

                         B E G I N  Y O U R  J O U R N E Y

                                ⛧°。 ⋆༺♱༻⋆。 °⛧                                      
                                        
                                  ✞ ❤︎ 𝓖𝓞𝓓 ❤︎ ✞
                                                                               
                                ⛧°。 ⋆༺♱༻⋆。 °⛧
                `;

    console.log(page);

    if (input === "1") {
        rl.question("\nPlease select how you feel today? \n[1]-Happy   [2]-Grateful   [3]-Peaceful   [4]-Hopeful   [5]-Loved   [6]-Inpired \nChoose an action: ", (answer) => {
            switch (answer) {
                case "1":
                    answer = "happy";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this verse inspire and lift your spirit.🌿✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nA cheerful heart is good medicine. ✨\n${"\x1b[3m"}— Proverbs 17:22${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - Let God’s Word fuel the positivity in your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "2":
                    answer = "grateful";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this verse inspire and lift your spirit.🌿✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nGive thanks to the Lord, for He is good; His love endures forever. ✨\n${"\x1b[3m"}— Psalm 107:1${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - Let God’s Word fuel the positivity in your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "3":
                    answer = "peaceful";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this verse inspire and lift your spirit.🌿✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nYou will keep in perfect peace those whose minds are steadfast, because they trust in You. ✨\n${"\x1b[3m"}— Psalm 37:7${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - Let God’s Word fuel the positivity in your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "4":
                    answer = "hopeful";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this verse inspire and lift your spirit.🌿✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nFor I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. ✨\n${"\x1b[3m"}— Jeremiah 29:11${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - Let God’s Word fuel the positivity in your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "5":
                    answer = "loved";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this verse inspire and lift your spirit.🌿✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nWe love because He first loved us. ✨\n${"\x1b[3m"}— 1 John 4:19${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - Let God’s Word fuel the positivity in your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "6":
                    answer = "inspired";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this verse inspire and lift your spirit.🌿✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \n“I can do all things through Christ who strengthens me. ✨\n${"\x1b[3m"}— Philippians 4:13${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - Let God’s Word fuel the positivity in your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                default:
            }

        })
    } else {
         rl.question("\nPlease select how you feel today? \n[1]-Sad   [2]-Lonely   [3]-Frustrated   [4]-Anxious   [5]-Afraid   [6]-Devastated   [7]-Angry   [8]-Tired   [9]-Lost   [10]-Jealous \nChoose an action: ", (answer) => {
            switch (answer) {
                case "1":
                    answer = "sad";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this Bible verse bring light to your soul. ✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nThe Lord is close to the brokenhearted and saves those who are crushed in spirit. ✨\n${"\x1b[3m"}— Psalm 34:18${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - May God’s word bring light to your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "2":
                    answer = "lonely";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this Bible verse bring light to your soul. ✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nNever will I leave you; never will I forsake you. ✨\n${"\x1b[3m"}— Hebrews 13:5${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - May God’s word bring light to your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "3":
                    answer = "frustrated";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this Bible verse bring light to your soul. ✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nBe still before the Lord and wait patiently for Him. ✨\n${"\x1b[3m"}— Psalm 37:7${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - May God’s word bring light to your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "4":
                    answer = "anxious";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this Bible verse bring light to your soul. ✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nCast all your anxiety on Him because He cares for you. ✨\n${"\x1b[3m"}— 1 Peter 5:7${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - May God’s word bring light to your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "5":
                    answer = "afraid";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this Bible verse bring light to your soul. ✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nWhen I am afraid, I put my trust in You. ✨\n${"\x1b[3m"}— Psalm 56:3${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - May God’s word bring light to your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "6":
                    answer = "devastated";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this Bible verse bring light to your soul. ✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \n“He heals the brokenhearted and binds up their wounds. ✨\n${"\x1b[3m"}— Psalm 147:3${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - May God’s word bring light to your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "7":
                    answer = "angry";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this Bible verse bring light to your soul. ✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \n“Be quick to listen, slow to speak and slow to become angry. ✨\n${"\x1b[3m"}— James 1:19${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - May God’s word bring light to your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "8":
                    answer = "tired";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this Bible verse bring light to your soul. ✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \n“Come to Me, all you who are weary and burdened, and I will give you rest. ✨\n${"\x1b[3m"}— Matthew 11:28${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - May God’s word bring light to your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "9":
                    answer = "lost";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this Bible verse bring light to your soul. ✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nYour word is a lamp to my feet and a light to my path. ✨\n${"\x1b[3m"}— Psalm 119:105${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - May God’s word bring light to your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                case "10":
                    answer = "jealous";
                    console.log(`\n✨ I know you're feeling ${answer}. Let this Bible verse bring light to your soul. ✨`);
                    console.log("");
                    console.log(`📓 Bible verse: \nLet us not become conceited, provoking and envying each other. ✨\n${"\x1b[3m"}— Galatians 5:26${"\x1b[0m"}`);
                    console.log("");
                    rl.question("[1]-Back \nChoose an action: ", (answer) => {
                        if (answer === "1") {
                            console.clear();
                            console.log(`𓆩†𓆪 😇 ${this.userLoginName.toUpperCase()} - May God’s word bring light to your heart. ✨🙏𓆩†𓆪`);
                            this.feelingToday();
                        } else {
                            console.clear();
                            console.log("❌ Invalid Option\n");
                            this.emotion();
                        }
                    });
                    break;

                default:
                    console.clear();
                    console.log("❌ Invalid Option\n");
                    this.emotion();
            }
         });
    }
}

closeApp() {
    console.log(`
                                                                            Pray and Never Give Up!🙇 🙏\n
                                                                        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣄⡀⢀⣀⣠⣤⣤⣶⣶⣶⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                            
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣠⣤⣿⠿⣩⣿⣿⣿⣿⣯⣛⣻⣯⣍⡛⣿⣿⣦⢰⣶⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣽⣿⡟⢹⣫⡿⠛⣿⣿⣿⠿⣛⣿⣿⣿⣿⠙⣿⣿⣿⣯⠻⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⡿⡟⣰⣶⠈⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⢻⣿⣿⡿⣧⣈⠻⣿⣿⣷⡀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⢰⡇⢿⡟⢰⣿⣿⣿⣿⣿⣿⣿⠿⠿⣿⣿⣿⣿⣿⣿⣷⠈⢿⣧⡀⣿⣿⣿⡄⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⠘⣷⢨⣿⠀⠻⢿⣿⣯⣤⣾⢃⣤⣶⣿⣿⣿⣿⣿⣿⣿⡏⠙⣿⣷⣿⣿⣿⣃⣤⡶⠀
                                                                ⠀⠀⠀⠀⣠⣴⣶⣶⣶⣿⡿⢹⣿⣿⠀⣿⣌⠛⠀⣠⣤⣌⡛⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣠⡙⢿⣿⣿⣿⣿⠋⠀⠀
                                                                ⠈⠓⠦⢾⠿⠛⠙⠛⠛⢉⣠⣾⣿⡟⠙⣦⡀⠀⡻⣿⣿⣿⣿⠒⠀⣿⠟⠁⣹⣉⠉⣿⣿⣿⣿⣿⣿⣷⠈⣿⣿⣿⡿⣾⠏⠀
                                                                ⣀⡤⠤⠦⣴⣴⣶⣶⣶⣿⣿⣿⣿⡇⣰⣿⡟⠀⠳⣦⣄⣉⠛⠀⠀⢿⣿⣿⣿⡻⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢹⣤⡄
                                                                ⠁⢀⣀⣠⣤⡽⠟⠿⣿⣿⣿⠿⢋⣴⣿⣿⣿⠀⠀⠻⣷⣉⠉⢛⢷⣦⣝⠿⠿⣯⣭⣸⣿⣿⣿⣇⠻⣿⣿⣿⡿⣋⠁⢸⡿⠁
                                                                ⠀⠈⠙⣿⣥⣄⣀⣀⣀⣠⠤⠒⠋⢿⣿⠟⣩⠴⣶⠖⠈⠙⢷⣮⠳⣦⡍⢁⣾⣿⣿⣿⣿⣿⣿⣿⣿⣾⠿⢿⣃⡿⠃⣭⣧⣄
                                                                ⠀⠀⠒⠉⢿⣿⣿⣿⣿⣿⣶⣤⣄⣈⣉⣹⣵⡾⠋⠻⠿⢶⡆⠉⣡⣈⠁⠀⢮⣉⠙⠻⣅⢸⣿⠿⠋⣠⣴⡿⢋⣵⡖⣿⡉⠉
                                                                ⠐⠒⠲⢦⣌⠛⠛⢋⣠⣾⣿⣿⣿⣿⣿⠿⠋⢀⠀⢀⠀⠸⠦⠔⠉⢻⣠⠤⢤⠉⠙⣛⡟⠉⠐⣶⠐⢿⡿⠃⠾⣁⡴⣿⣿⠀
                                                                ⠀⠀⠀⠀⣿⣷⣶⣿⣿⠏⢀⣴⣶⠖⠀⠀⠀⠈⢩⠛⠻⢷⣦⡀⠀⠈⠁⠀⢠⡧⠴⠿⠿⡆⢀⣨⡤⣀⣠⣿⣶⣿⡷⢹⣧⠀
                                                                ⠀⠀⠀⠀⠙⠻⠿⠟⠋⠀⣾⣿⣧⡀⠀⠀⠀⠀⠈⠳⣤⣀⠈⠛⢷⣤⣀⡀⠉⠀⠀⠀⠀⠸⠋⠀⠀⢸⣿⣿⣿⡏⠀⢸⣿⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠉⠀⠉⠀⠀⠀⢀⣠⣤⠤⠤⠴⢶⣾⣿⣿⣿⡇⠀⣼⠏⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⢿⣁⣀⣀⠀⣠⣿⣿⣿⣿⡟⠃⣰⡏⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠃⠀⠈⠉⢀⣴⣿⣿⣿⣿⣿⡇⢰⣿⡇⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⢰⡀⠀⠀⠀⢰⡇⠀⠀⣠⣴⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣀⣀⣤⣶⣿⣷⣶⣦⣌⣧⠀⠀⢠⣿⣀⣠⣾⣿⣿⣿⡿⢋⡩⠟⣿⣿⣇⡿⠋⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⠟⠁⠀⠈⠙⠻⣿⣿⣷⣤⣾⣿⣿⣿⠛⢉⣼⣟⣵⠏⣠⣾⢿⣿⡟⠁⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠀⠀⠈⣲⣶⣤⣤⡀⢀⡿⠉⢻⣿⡇⠀⣾⡿⢸⠏⣴⡿⠁⣼⣿⡇⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣦⠀⠀⢻⣿⡏⠀⣰⡿⠁⠀⣾⣿⣿⢰⣿⠇⢸⣾⡟⠁⣼⣿⣿⡇⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⢿⣿⣿⣦⣼⣿⣃⡴⠋⠀⠀⢰⡿⣿⣿⢸⡿⢀⣾⠟⢀⣾⣿⣿⣿⠇⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠋⠉⠀⠀⠀⢀⣞⡕⢻⣿⢸⣷⡞⠁⣤⡿⢿⣿⣿⡟⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⠎⣠⣾⡿⢸⡟⢀⣾⠟⢀⣼⣿⠏⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠛⣼⣿⡟⢀⣼⠇⣼⡏⢠⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡟⢰⣿⡟⣰⣿⠏⣰⣿⢡⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⣾⡟⣸⣿⡟⢸⣿⣿⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣾⣿⠀⣿⣿⡇⢸⣿⡇⣼⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⠀⠘⠻⠧⠉⠉⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡏⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡀⠿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                                
                                                   
                                                                                                                                                `);
}


  run() {
    this.userLogin();
  }
}

const myApp = new FaithLift("FAITH LIFT");
myApp.run();


