const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


const teamMembers = [];

// Prompt user for team manager information
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the team manager's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the team manager's ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the team manager's email:",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter the team manager's office number:",
    },
    ])
    .then((answers) => {
        // Create a new Manager object using the user's input
        const manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        );
        // Add the manager to the teamMembers array
        teamMembers.push(manager);
        // Call function to prompt user for additional team members
        addTeamMember();
    });

function addTeamMember() {
    // Prompt user to select an Engineer, Intern, or finish building the team
    inquirer
        .prompt([
        {
            type: "list",
            name: "type",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I'm done adding team members"],
        },
        ])