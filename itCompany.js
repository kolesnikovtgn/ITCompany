class Project {
    constructor(status='free') {
        this.id = this.getId();
        this.type = this.getType();
        this.complexity = this.getComplexity();
        this.status = status;
    }

    getType() {
        let typeArray = ['web', 'mobile'];
        let randomType = typeArray[Math.floor(Math.random()*typeArray.length)];

        return randomType;
    }

    changeStatus(status) {
        this.status = status;
    }

    getComplexity() {
        let complexity = [1, 2 ,3];

        let randomComplexity = complexity[Math.floor(Math.random()*complexity.length)];

        return randomComplexity;
    }

    getId() {
        let uuid = function () {
            let i, random;
            let id = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    id += '1';
                }
                id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
            }
            return id;
        }
        return uuid();
    }
}


class Employee {
    constructor(type, experience=0, status='free') {
        this.id = this.getId();
        this.type = type;
        this.experience = experience;
        this.status = status;
    }

    countExp() {
        this.experience++;
    }

    changeStatus(status) {
        this.status = status;
    }

    getId() {
        let uuid = function () {
            let i, random;
            let id = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    id += '1';
                }
                id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
            }
            return id;
        }
        return uuid();
    }
}

class Department {
    constructor() {

    }
}

class Web extends Department {
    constructor() {
        super();
    }

}

class Mobile extends Department {
    constructor() {
        super();
    }

}

class Qa extends Department {
    constructor() {
        super();
    }

}

class Director {
    constructor() {
        this.employees = [];
        this.projects = [];
    }

    addEmployee(type) {
        this.employees.push(new Employee(type));
    }

    deleteEmployee(id) {
        this.employees.splice(id, 1);
    }

    getProjects() {
        let countPrj = Math.floor(Math.random()*4);

        for(let i=0; i<=countPrj; i++){
            this.projects.push(new Project());
        }
    }
}

let prj1 = new Project();
console.log(prj1.id);
console.log(prj1.type);
console.log(prj1.status);
prj1.changeStatus('qa');
console.log(prj1.status);



let prj2 = new Employee('mob');
console.log(prj2.id);
console.log(prj2.type);
console.log(prj2.experience);
prj2.countExp();
prj2.countExp();
console.log(prj2.experience);
prj2.countExp();
prj2.countExp();
prj2.countExp();
prj2.countExp();
console.log(prj2.experience);
prj2.changeStatus('busy');
console.log(prj2.status);

let prj3 = new Director();
prj3.addEmployee('web');
prj3.addEmployee('mobile');
prj3.addEmployee('qa');
prj3.addEmployee('web');
console.log(prj3.employees);
prj3.getProjects();
console.log(prj3.projects);