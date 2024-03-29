import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.cyan(`Wellcome to contact manager App`));

let nextId = 1;
interface Contact {
  id: number;
  name: string;
  phonNumber: number;
  email: string;
}

class contactManager {
  contactDetails: Contact[];
  constructor() {
    this.contactDetails = [];
  }

  async mainManue(): Promise<void> {
    let exit = false;
    do {
      const contactlist = await inquirer.prompt([
        {
          name: "options",
          type: "list",
          message: "select an option",
          choices: [
            "Add Contact",
            "View contacts",
            "Update contacts",
            "Delete contacts",
            "Exit",
          ],
        },
      ]);

      switch (contactlist.options) {
        case "Add Contact":
          await this.addContact();
          break;

        case "View contacts":
          await this.viewContact();
          break;

        case "Update contacts":
          await this.updateContact();
          break;
        case "Delete contacts":
          await this.deleteContact();
          break;
        case "Exit":
          exit = true;
          console.log(chalk.green("Good bye"));
          break;
        default:
          break;
      }
    } while (!exit);
  }

  async addContact(): Promise<void> {
    const addition = await inquirer.prompt([
      { name: "id", message: "Enter contact ID:" },
      { name: "name", message: "Enter contact name:" },
      { name: "phoneNumber", message: "Enter contact phone number:" }, // Remove parseInt() from here
      { name: "email", message: "Enter contact email:" },
    ]);
    this.contactDetails.push({ ...addition, id: parseInt(addition.id) });
    console.log("Contact added successfully!");
  }

  async viewContact(): Promise<void> {
    if (this.contactDetails.length <= 0) {
      console.log(chalk.red("Contact list is empty!"));
    } else {
      console.log(chalk.magenta("All Contacts:"));

      this.contactDetails.forEach((contact) => {
        console.log(chalk.cyan(`ID: ${contact.id}`));
        console.log(chalk.cyan(`Name: ${contact.name}`));
        console.log(chalk.cyan(`Phone Number: ${contact.phonNumber}`));
        console.log(chalk.cyan(`Email: ${contact.email}`));
        console.log(chalk.magenta("_____________________"));
      });
    }
  }

  async updateContact(): Promise<void> {
    const idPrompt = await inquirer.prompt({
      name: "id",
      type: "input",
      message: "Enter the ID of the contact you want to update:",
    });
    const contactId = parseInt(idPrompt.id);

    const index = this.contactDetails.findIndex(
      (contact) => contact.id === contactId
    );
    if (index === -1) {
      console.log(chalk.red("Contact not found!"));
      return;
    }

    const updatedDetails = await inquirer.prompt([
      { name: "name", message: "Enter new name:" },
      { name: "phonNumber", message: "Enter new phone number:" },
      { name: "email", message: "Enter new email:" },
    ]);

    this.contactDetails[index] = {
      ...this.contactDetails[index],
      ...updatedDetails,
    };
    console.log(chalk.yellow("Contact updated successfully!"));
  }

  async deleteContact(): Promise<void> {
    if (this.contactDetails.length <= 0) {
      console.log(chalk.red("No contact found to delete"));
    } else {
      const idPrompt = await inquirer.prompt({
        name: "id",
        type: "input",
        message: "Enter the ID of the contact you want to delete:",
      });

      const contactId = parseInt(idPrompt.id);

      const contactIndex = this.contactDetails.findIndex(
        (contact) => contact.id === contactId
      );

      if (contactIndex === -1) {
        console.log(chalk.red("Invalid ID. Please enter a valid ID."));
      } else {
        const index = this.contactDetails.findIndex(
          (contact) => contact.id === parseInt(idPrompt.id)
        );
        this.contactDetails.splice(index, 1);
        console.log(chalk.green("Contact deleted successfully!"));
      }
    }
  }
}

const myContactManager = new contactManager();
myContactManager.mainManue();
