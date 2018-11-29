const getId = function () {
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


class Director {
    constructor() {

    }

    addEmployee(employees, employee) {
        employees.push(employee);
    }

    deleteEmployee(employees, id) {
        employees.splice(id, 1);
    }

    getProjects(projects) {
        let countPrj = Math.floor(Math.random()*4);

        for(let i=0; i<=countPrj; i++){
            projects.push(new Project());
        }
    }
}

class Project {
    constructor(status='free', busyDays=0) {
        this.id = getId();
        this.type = this.getType();
        this.complexity = this.getComplexity();
        this.status = status;
        this.busyDays = busyDays;
    }

    getType() {
        let typeArray = ['web', 'mobile'];
        let randomType = typeArray[Math.floor(Math.random()*typeArray.length)];

        return randomType;
    }

    changeStatus(status) {
        this.status = status;
    }

    // developmentProject() {
    //     for(let i=this.complexity; i>0; i--){
    //         this.changeStatus('busy');
    //     }
    //     this.changeStatus('completed');
    // }

    getComplexity() {
        let randomComplexity = Math.floor(Math.random() * 3) + 1;

        return randomComplexity;
    }
}

class Employee {
    constructor(type, experience=0, status='free', busyDays=0, freeDays=0) {
        this.id = getId();
        this.type = type;
        this.experience = experience;
        this.status = status;
        this.busyDays = busyDays;
        this.freeDays = freeDays;
    }

    countExp() {
        this.experience++;
    }

    countFreeDays() {
        this.freeDays++;
    }

    // changeStatus() {
    //     if (this.busyDay > 0) {
    //         this.status = 'busy';
    //     } else {
    //         this.status = 'free';
    //     }
    // }

    // getProject(project) {
    //     for(let i=project.complexity; i>0; i--){
    //         this.busyDay++;
    //     }
    //     this.countExp();
    //     this.changeStatus();
    //     this.freeDay=0;
    // }
}

class WebDeveloper extends Employee {
    constructor(type='web', experience=0, status='free', busyDays=0, freeDays=0) {
        super(type, experience, status, busyDays, freeDays);
        this.id = getId();
        this.type = type;
    }
}

class MobDeveloper extends Employee {
    constructor(type='mob', experience=0, status='free', busyDays=0, freeDays=0) {
        super(type, experience, status, busyDays, freeDays);
        this.id = getId();
        this.type = type;
    }
}

class QaDeveloper extends Employee {
    constructor(type='qa', experience=0, status='free', busyDays=0, freeDays=0) {
        super(type, experience, status, busyDays, freeDays);
        this.id = getId();
        this.type = type;
    }
}

class Department {
    constructor() {

    }

}

class WebDepartment extends Department {
    constructor(employees, projects) {
        super();

        this.webEmployees = employees;
        this.webProjects = projects;
    }

    getWebEmployees() {
        return this.webEmployees.filter((item) => {
            return item.type == 'web';
        });
    }

    getWebProjects() {
        return this.webProjects.filter((item) => {
            return item.type == 'web' && item.status == 'free';
        });
    }

    // development() {
    //     let webEmployesFree = this.webEmployees.filter((item) => {
    //         return item.type == 'free';
    //     });
    //
    //     for(let i=0; i < webEmployesFree.length; i++) {
    //         // webEmployesFree[i].getProject();
    //         // this.webProjects[i].developmentProject();
    //     }
    //
    //     this.webProjects.forEach(() => {
    //
    //     });
    // }
}

class MobDepartment extends Department {
    constructor(employees, projects) {
        super();

        this.mobEmployees = employees;
        this.mobProjects = projects;
    }

    getMobEmployees() {
        return this.mobEmployees.filter((item) => {
            return item.type == 'mob';
        });
    }

    getMobProjects() {
        return this.mobProjects.filter((item) => {
            return (item.type == 'mob') && (item.status == 'free');
        });
    }

}

class QaDepartment extends Department {
    constructor(employees, projects) {
        super();

        this.qaEmployees = employees;
        this.qaProjects = projects;

    }

    getQaEmployees() {
        return this.qaEmployees.filter((item) => {
            return item.type == 'qa';
        });
    }

    getQaProjects() {
        return this.qaProjects.filter((item) => {
            return item.status == 'completed';
        });
    }
}

class Company {
    constructor() {
        this.employees = [];
        this.projects = [];

        this.director = new Director();
        this.webDepartment = new WebDepartment(this.employees, this.projects);
        this.qaDepartment = new QaDepartment(this.employees, this.projects);

    }

    work() {
        this.director.getProjects(this.projects);
        this.director.addEmployee(this.employees, new WebDeveloper());
        this.director.addEmployee(this.employees, new WebDeveloper());
        this.director.addEmployee(this.employees, new WebDeveloper());
        this.director.addEmployee(this.employees, new WebDeveloper());
        this.director.addEmployee(this.employees, new QaDeveloper());
        console.log(this.projects);
        console.log("====================");
        console.log(this.employees);

        // this.employees.forEach((item) => {
        //    if(item.status == 'free') {
        //        item.getProject(this.projects[0]);
        //        console.log(item.status);
        //    }
        //    item.changeFreeDays();
        //    console.log(this.employees);
        //    if(item.freeDays == 3) {
        //        this.director.deleteEmployee(this.employees, item.id);
        //    }
        //     console.log(this.employees);
        // });
        console.log("+++++++++++++++++++++++++++++++++++++");
        console.log(this.webDepartment.getWebEmployees());
        console.log("+++++++++++++++++++++++++++++++++++++");
        console.log(this.webDepartment.getWebProjects());
        this.webDepartment.getWebEmployees()[0].countExp();
        this.webDepartment.getWebEmployees()[0].countExp();
        this.webDepartment.getWebEmployees()[0].countFreeDays();
        console.log(this.webDepartment.getWebEmployees()[0].id);
        console.log(this.webDepartment.getWebEmployees()[0].type);
        console.log(this.webDepartment.getWebEmployees()[0].experience);
        console.log(this.webDepartment.getWebEmployees()[0].status);
        console.log(this.webDepartment.getWebEmployees()[0].busyDays);
        console.log(this.webDepartment.getWebEmployees()[0].freeDays);

        this.qaDepartment.getQaEmployees()[0].countFreeDays();
        console.log(this.qaDepartment.getQaEmployees());

    }
}
let company = new Company();
company.work();