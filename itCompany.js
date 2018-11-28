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

    developmentProject() {
        for(let i=this.complexity; i>0; i--){
            this.changeStatus('busy');
        }
        this.changeStatus('completed');
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
        this.busyDay=0;
        this.freeDay=0;
    }

    countExp() {
        this.experience++;
    }

    changeStatus() {
        if (this.busyDay > 0) {
            this.status = 'busy';
        } else {
            this.status = 'free';
        }
    }

    getProject(project) {
        for(let i=project.complexity; i>0; i--){
            this.busyDay++;
        }
        this.countExp();
        this.changeStatus();
        this.freeDay=0;
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
    constructor(employees, projects) {

        super();

        this.webEmployees = employees.filter((item) => {
            return item.type == 'web';
        });
        this.webProjects = projects.filter((item) => {
            return (item.type == 'web') && (item.status == 'free');
        });
    }

    development() {
        let webEmployesFree = this.webEmployees.filter((item) => {
            return item.type == 'free';
        });

        for(let i=0; i < webEmployesFree.length; i++) {
            // webEmployesFree[i].getProject();
            // this.webProjects[i].developmentProject();
        }

        this.webProjects.forEach(() => {

        });
    }
}

class Mobile extends Department {
    constructor(employees, projects) {

        super();

        this.mobEmployees = employees.filter((item) => {
            return item.type == 'mob';
        });
        this.mobProjects = projects.filter((item) => {
            return (item.type == 'mob') && (item.status == 'free');
        });
    }

}

class Qa extends Department {
    constructor(employees, projects) {

        super();

        this.qaEmployees = employees.filter((item) => {
            return item.type == 'qa';
        });
        this.mobProjects = projects.filter((item) => {
            return item.status == 'completed';
        });

    }
}

class Company {
    constructor() {
        this.director = new Director();
        this.webDepartment = new Web(this.director.employees, this.director.projects);
        this.mobDepartment = new Mobile(this.director.employees, this.director.projects);
        this.qaDepartment = new Qa(this.director.employees, this.director.projects);


    }

    work(allDays) {
        for(let i=0; i<allDays; i++) {
            this.director.getProjects();
            // if(i==0) {console.log("lets GO!"); continue;} // Если это первый день - переходим на следующий день
        }
        console.log(this.director.projects);
        console.log("sdfsdfdsf");

        console.log("sdfsdfdsf");
        console.log(this.director.projects);
        console.log(this.director.projects.length);
    }

}

let company = new Company();
company.work(3);