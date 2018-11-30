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

    deleteEmployee(employees, index) {
        employees.splice(index, 1);
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

    countBusyDays() {
        this.busyDays--;
    }

    setBusyDays(complexity) {
        this.busyDays = complexity;
    }

    developmentProject() {
        if(this.busyDays > 0) {
            this.changeStatus('busy');
        } else {
            this.changeStatus('completed');
        }
    }

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

    countBusyDays() {
        this.busyDays--;
    }

    changeStatus(status) {
        this.status = status;
    }

    resetFreeDays() {
        this.freeDays = 0;
    }

    changeStatusOfBusy() {
        if(this.busyDays > 0) {
            this.changeStatus('busy');
        } else {
            this.countExp();
            this.changeStatus('free');
        }
    }

    getProject(projectComplexity) {

        this.busyDays = projectComplexity;

        this.changeStatusOfBusy();
        this.resetFreeDays();
    }
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
    constructor(employees, projects, needWebDevelopers=0) {
        super();

        this.webDevelopers = employees;
        this.webProjects = projects;
        this.needWebDevelopers = needWebDevelopers;
    }

    getWebDevelopersFree() {
        return this.webDevelopers.filter((item) => {
            return item.type == 'web' && item.status == 'free';
        });
    }

    getWebDevelopersBusy() {
        return this.webDevelopers.filter((item) => {
            return item.type == 'web' && item.status == 'busy';
        });
    }

    getWebProjectsFree() {
        return this.webProjects.filter((item) => {
            return item.type == 'web' && item.status == 'free';
        });
    }

    getWebProjectsBusy() {
        return this.webProjects.filter((item) => {
            return item.type == 'web' && item.status == 'busy';
        });
    }

    resetNeedWebDevelopers() {
        this.needWebDevelopers = 0;
    }

    getNeedWebDevelopers() {
        return this.needWebDevelopers;
    }

    countNeedWebDevelopers() {
        this.needWebDevelopers++;
    }

    developmentWebProjects() {
        this.getWebProjectsFree().forEach((itemWebProject) => {
            if(this.getWebDevelopersFree().length > 0) {
                    itemWebProject.setBusyDays(itemWebProject.complexity);
                    itemWebProject.developmentProject();

                    this.getWebDevelopersFree()[0].getProject(itemWebProject.complexity);
            } else {
                this.countNeedWebDevelopers();
            }
        });

        this.getWebDevelopersFree().forEach((itemFreeDevelopers) => {
            itemFreeDevelopers.countFreeDays();
        });

        this.getWebProjectsBusy().forEach((itemBusyProject) => {
            itemBusyProject.countBusyDays();
            itemBusyProject.developmentProject();
        });

        this.getWebDevelopersBusy().forEach((itemBusyDevelopers) => {
            itemBusyDevelopers.countBusyDays();
            itemBusyDevelopers.changeStatusOfBusy();
        });
    }
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
    }

    work(allDays) {

        for(let i=1; i <= allDays; i++) {

            if(this.projects.length > 0) {
                this.director.getProjects(this.projects);
            } else {
                this.director.getProjects(this.projects);
                continue;
            }
            // WebDepartment work
            this.webDepartment.developmentWebProjects();

            for(let i=0; i < this.webDepartment.getNeedWebDevelopers(); i++){
                this.director.addEmployee(this.employees, new WebDeveloper());
            }

            this.webDepartment.resetNeedWebDevelopers();

            // this.employees.forEach((itemDevelopers, index) => {
            //     if(itemDevelopers.freeDays == 3) {
            //         this.director.deleteEmployee(this.employees, index);
            //     }
            // });

            // console.log(i + "=========" + i);
            // console.log(this.employees);
            // console.log(this.projects);
            // console.log(i + "=========" + i);
        }

        console.log(this.employees);
        console.log("000%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        // this.employees.forEach((item, index) => {
        //     if(item.freeDays > 3) {
        //         this.director.deleteEmployee(this.employees, index);
        //     }
        // });
        console.log(this.employees);
    }
}
let company = new Company();
company.work(15);