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
    constructor(employees, deleteEmployees=0) {
        this.employees = employees;
        this.deleteEmployees = deleteEmployees;
    }

    addEmployee(employees, employee) {
        employees.push(employee);
    }

    deleteEmployee(id) {
        // Он ругается на findIndex, попробуем перенести поиск  index вовнутрь Company
        // перед вызовом функции deleteEmployee , видимо что то в классах не дает обратиться к findIndex

        const index = this.employees.findIndex((item) => item.id === id);

        this.employees.splice(index, 1);
        this.countDeleteEmployees();
    }

    countDeleteEmployees() {
        this.deleteEmployees++;
    }

    getDeleteEmployees() {
        return this.deleteEmployees;
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
        let typeArray = ['web', 'mob'];
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

    getId() {
        return this.id;
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

    getWebDevelopers() {
        return this.webDevelopers.filter((item) => {
            return item.type == 'web';
        });
    }

    getWebProjects() {
        return this.webProjects.filter((item) => {
            return item.type == 'web';
        });
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

    getEmployeesForDelete() {
        function compareExperience(employee1, employee2) {
            return employee1.experience - employee2.experience;
        }

        let freeAndBigFreeDaysEmployees = this.webDevelopers.filter((item) => {
            return item.status == 'free' && item.freeDays > 2;
        });

        return freeAndBigFreeDaysEmployees.sort(compareExperience);
    }

    // getEmployeesForProject() {
    //     function compareExperience(employee1, employee2) {
    //         return employee2.experience - employee1.experience;
    //     }
    //
    //     let freeAndBigFreeDaysEmployees = this.webDevelopers.filter((item) => {
    //         return item.status == 'free' && item.freeDays > 0;
    //     });
    //
    //     return freeAndBigFreeDaysEmployees.sort(compareExperience);
    // }

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
    constructor(employees, projects, needMobDevelopers=0) {
        super();

        this.mobDevelopers = employees;
        this.mobProjects = projects;
        this.needMobDevelopers = needMobDevelopers;
    }

    getMobDevelopers() {
        return this.mobDevelopers.filter((item) => {
            return item.type == 'mob';
        });
    }

    getMobProjects() {
        return this.mobProjects.filter((item) => {
            return item.type == 'mob';
        });
    }

    getMobDevelopersFree() {
        return this.mobDevelopers.filter((item) => {
            return item.type == 'mob' && item.status == 'free';
        });
    }

    getMobDevelopersBusy() {
        return this.mobDevelopers.filter((item) => {
            return item.type == 'mob' && item.status == 'busy';
        });
    }

    getMobProjectsFree() {
        return this.mobProjects.filter((item) => {
            return item.type == 'mob' && item.status == 'free';
        });
    }

    getMobProjectsBusy() {
        return this.mobProjects.filter((item) => {
            return item.type == 'mob' && item.status == 'busy';
        });
    }

    resetNeedMobDevelopers() {
        this.needMobDevelopers = 0;
    }

    getNeedMobDevelopers() {
        return this.needMobDevelopers;
    }

    countNeedMobDevelopers() {
        this.needMobDevelopers++;
    }

    getEmployeesForDelete() {
        function compareExperience(employee1, employee2) {
            return employee1.experience - employee2.experience;
        }

        let freeAndBigFreeDaysEmployees = this.mobDevelopers.filter((item) => {
            return item.status == 'free' && item.freeDays > 2;
        });

        return freeAndBigFreeDaysEmployees.sort(compareExperience);
    }

    // getEmployeesForProject() {
    //     function compareExperience(employee1, employee2) {
    //         return employee2.experience - employee1.experience;
    //     }
    //
    //     let freeAndBigFreeDaysEmployees = this.mobDevelopers.filter((item) => {
    //         return item.status == 'free' && item.freeDays > 0;
    //     });
    //
    //     return freeAndBigFreeDaysEmployees.sort(compareExperience);
    // }

    developmentMobProjects() {
        // this.getMobProjectsFree().forEach((itemMobProject) => {
        //     if(this.getMobDevelopersFree().length > 0) {
        //         itemMobProject.setBusyDays(itemMobProject.complexity);
        //         itemMobProject.developmentProject();
        //
        //         this.getMobDevelopersFree()[0].getProject(itemMobProject.complexity);
        //     } else {
        //         this.countNeedMobDevelopers();
        //     }
        // });

        this.getMobProjectsFree().forEach((itemMobProject) => {
            if(this.getMobDevelopersFree().length > 0 && this.getMobDevelopersFree().length >= itemMobProject.complexity) {
                itemMobProject.setBusyDays(1);
                itemMobProject.developmentProject();


                for(let i=0; i < itemMobProject.complexity; i++) {
                    this.getMobDevelopersFree()[0].getProject(1);
                }
            } else {
                for(let i=0; i < itemMobProject.complexity; i++) {
                    this.countNeedMobDevelopers();
                }
            }
        });

        this.getMobDevelopersFree().forEach((itemFreeDevelopers) => {
            itemFreeDevelopers.countFreeDays();
        });

        this.getMobProjectsBusy().forEach((itemBusyProject) => {
            itemBusyProject.countBusyDays();
            itemBusyProject.developmentProject();
        });

        this.getMobDevelopersBusy().forEach((itemBusyDevelopers) => {
            itemBusyDevelopers.countBusyDays();
            itemBusyDevelopers.changeStatusOfBusy();
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

        this.director = new Director(this.employees);
        this.webDepartment = new WebDepartment(this.employees, this.projects);
        this.mobDepartment = new MobDepartment(this.employees, this.projects);
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

            if(this.webDepartment.getEmployeesForDelete().length > 0) {
                this.director.deleteEmployee(this.webDepartment.getEmployeesForDelete()[0], this.webDepartment.getEmployeesForDelete()[0].getId());
            }

            // MobileDepartament work
            this.mobDepartment.developmentMobProjects();

            for(let i=0; i < this.mobDepartment.getNeedMobDevelopers(); i++){
                this.director.addEmployee(this.employees, new MobDeveloper());
            }

            this.mobDepartment.resetNeedMobDevelopers();

            if(this.mobDepartment.getEmployeesForDelete().length > 0) {
                this.director.deleteEmployee(this.mobDepartment.getEmployeesForDelete()[0], this.mobDepartment.getEmployeesForDelete()[0].getId());
            }

        }

        console.log(this.webDepartment.getWebDevelopers());
        console.log(this.webDepartment.getWebProjects());
        console.log(this.director.getDeleteEmployees());
        console.log(this.mobDepartment.getMobDevelopers());
        console.log(this.mobDepartment.getMobProjects());
    }
}

let company = new Company();
company.work(15);