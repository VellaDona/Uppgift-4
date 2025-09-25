
"use strict";
//declare variables
const completedScoreNotice = document.querySelector("#completedScoreNotice");
const inputTask = document.querySelector("#inputTask");
const addNewTaskBtn = document.querySelector("#addNewTaskBtn");
const emptyInputNotice = document.querySelector("small");
const allTasksList = document.querySelector("#allTasksList");

addNewTaskBtn.addEventListener("click", allThatHappens);

//add event listener to Enter-key
inputTask.addEventListener("keydown", event => {
   if(event.key === "Enter"){
      allThatHappens();
   }});

let taskText = "";
let completedScore = 0;
const allMyTasksArray = [];

//here happens everything
function allThatHappens() {

   //handle input
   taskText = inputTask.value;

   //notice if the input is empty
   if (taskText.trim().length === 0) {
      emptyInputNotice.textContent = `You cannot add en empty task. Please write a task before you add it.`.toUpperCase();
      emptyInputNotice.setAttribute("class","emptyInputNotice2");
      return;
   }

   //emptyInputNotice dissappears if input isn't empty
   emptyInputNotice.textContent = "";

   //create <li> 
   const li = document.createElement("li");
   //add <li> to <ul>
   allTasksList.appendChild(li);


   //create <span> & add to <li>
   const spanInLi = document.createElement("span");
   spanInLi.textContent = taskText;
   li.appendChild(spanInLi);

   //mark a task as completed by clicking it and unmark it back
   spanInLi.addEventListener("click", () => {
         if (spanInLi.classList.contains("completed")) {
            spanInLi.classList.remove("completed");
            completedScore--;
            changeStatusCompleted(spanInLi.textContent, false);
         }
         else {
            spanInLi.classList.add("completed");
            completedScore++;
            changeStatusCompleted(spanInLi.textContent, true);
         }
         //update score
         completedScoreNotice.textContent = `Completed tasks: ${completedScore}`;
      }
   )

   //create an object for each task and add it to array of <ul> allMyTasksArray
   const taskTextObject = { name: taskText, completed: false };
   allMyTasksArray.push(taskTextObject);  

   //create a trashbin as <span> and add it to <li>
   const trashbin = document.createElement("span");
   trashbin.innerHTML = "&#x1F5D1";
   trashbin.classList.add("trashbin");
   li.appendChild(trashbin);

   //remove task from <ul>-list by clicking on the trashbin
   trashbin.addEventListener("click", () => {
         if (spanInLi.classList.contains("completed")) {
            completedScore--;
            completedScoreNotice.textContent = `Completed tasks: ${completedScore}`;
         }

         //remove a task = <li> from the list
         li.remove();

         //show again the notice abt empty list if all tasks are removed
         if (allTasksList.childElementCount === 0) {
            emptyInputNotice.classList.add("emptyInputNotice");
            emptyInputNotice.textContent = `Your list is empty again. Please write a task before you add it.`;
         }

         //find index of the task object by its name-property and remove object from array allMyTasksArray
         let deleteTask = spanInLi.textContent;
         let deleteIndex = allMyTasksArray.map(currentValue => currentValue.name).indexOf(deleteTask);
         allMyTasksArray.splice(deleteIndex, 1);
      }
   )

   //empty input and return focus to input
   inputTask.value = "";
   inputTask.focus();
}

//function to handle status of class "completed" for objects of the array allMyTasksArray
function changeStatusCompleted(taskText, completedStatus) {
   let searchIndex = allMyTasksArray.map(currentValue => currentValue.name).indexOf(taskText);
   allMyTasksArray[searchIndex].completed = completedStatus;
}