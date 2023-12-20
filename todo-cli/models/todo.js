'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class Todo extends Model {
static async addTask(params) {
return await Todo.create(params);}
static async showList() {
console.log("My Todo list \n Overdue");
console.log(
(await Todo.overdue())
.map((todo) => {
return todo.displayableString();
})
.join("\n")
);
console.log("\n Due Today");
console.log(
(await Todo.dueToday())
.map((todo) => todo.displayableString())
.join("\n")
);
console.log("\n Due Later");
console.log(
(await Todo.dueLater())
.map((todo) => todo.displayableString())
.join("\n")
);
}
static async overdue() {
return await Todo.findAll({
where: {
dueDate: { [Op.lt]: new Date().toLocaleDateString("en-CA") },
},
});
}
static async dueToday() {
return await Todo.findAll({
where: {
dueDate: { [Op.eq]: new Date().toLocaleDateString("en-CA") },
},
});
}
static async dueLater() {
return await Todo.findAll({
where: {
dueDate: { [Op.gt]: new Date().toLocaleDateString("en-CA") },
},
});
}
static async markAsComplete(id) {
await Todo.update(
{ completed: true },
{
where: {
id: id,
},
}
);
}
displayableString() {
let checkbox = this.completed ? "[x]" : "[ ]";
return `${this.id}. ${checkbox} ${this.title} ${
this.dueDate == new Date().toLocaleDateString("en-CA")
? ""
: this.dueDate
}`.trim();
}
}
return Todo;
};
