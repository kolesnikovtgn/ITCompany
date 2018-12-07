const uuid = require('uuid/v1');

class Project {
  constructor(status = 'free', busyDays = 0) {
    this.id = uuid();
    this.type = this.getType();
    this.complexity = this.getComplexity();
    this.status = status;
    this.busyDays = busyDays;
  }

  getType() {
    this.typeArray = ['web', 'mob'];
    return this.typeArray[Math.floor(Math.random() * this.typeArray.length)];
  }

  setStatus(status) {
    this.status = status;
  }

  decrementBusyDays() {
    this.busyDays -= 1;
  }

  setBusyDays(complexity) {
    this.busyDays = complexity;
  }

  developmentProject() {
    (this.busyDays > 0) ? this.setStatus('busy') : this.setStatus('completed');
  }

  developmentOfQa() {
    (this.busyDays > 0) ? this.setStatus('completed') : this.setStatus('qaApproved');
  }

  getComplexity() {
    this.mathComplexity = Math.floor(Math.random() * 3) + 1;
    return this.mathComplexity;
  }
}

class Director {
  constructor(employees, deleteEmployees = 0, addEmployees = 0) {
    this.employees = employees;
    this.deleteEmployees = deleteEmployees;
    this.addEmployees = addEmployees;
  }

  addEmployee(employees, employee) {
    employees.push(employee);
    this.incrementAddEmployees();
  }

  incrementAddEmployees() {
    this.addEmployees += 1;
  }

  getAddEmployees() {
    return this.addEmployees;
  }

  deleteEmployee(id) {
    const index = this.employees.findIndex(item => item.id === id);

    this.employees.splice(index, 1);
    this.incrementDeleteEmployees();
  }

  incrementDeleteEmployees() {
    this.deleteEmployees += 1;
  }

  getDeleteEmployees() {
    return this.deleteEmployees;
  }

  getProjects(projects) {
    this.countPrj = Math.floor(Math.random() * 4);

    for (let i = 0; i <= this.countPrj; i += 1) {
      projects.push(new Project());
    }
  }
}

class Employee {
  constructor(type, experience = 0, status = 'free', busyDays = 0, freeDays = 0) {
    this.id = uuid();
    this.type = type;
    this.experience = experience;
    this.status = status;
    this.busyDays = busyDays;
    this.freeDays = freeDays;
  }

  getId() {
    return this.id;
  }

  incrementExp() {
    this.experience += 1;
  }

  incrementFreeDays() {
    this.freeDays += 1;
  }

  decrementBusyDays() {
    this.busyDays -= 1;
  }

  setStatus(status) {
    this.status = status;
  }

  resetFreeDays() {
    this.freeDays = 0;
  }

  changeStatusOfBusy() {
    if (this.busyDays > 0) {
      this.setStatus('busy');
    } else {
      this.incrementExp();
      this.setStatus('free');
    }
  }

  getProject(projectComplexity) {
    this.busyDays = projectComplexity;

    this.changeStatusOfBusy();
    this.resetFreeDays();
  }
}

class WebDeveloper extends Employee {
  constructor(type = 'web', experience = 0, status = 'free', busyDays = 0, freeDays = 0) {
    super(type, experience, status, busyDays, freeDays);
    this.id = uuid();
    this.type = type;
  }
}

class MobDeveloper extends Employee {
  constructor(type = 'mob', experience = 0, status = 'free', busyDays = 0, freeDays = 0) {
    super(type, experience, status, busyDays, freeDays);
    this.id = uuid();
    this.type = type;
  }
}

class QaDeveloper extends Employee {
  constructor(type = 'qa', experience = 0, status = 'free', busyDays = 0, freeDays = 0) {
    super(type, experience, status, busyDays, freeDays);
    this.id = uuid();
    this.type = type;
  }
}

class Department {
  constructor(employees, projects, needDevelopers = 0, type) {
    this.developers = employees;
    this.projects = projects;
    this.needDevelopers = needDevelopers;
    this.type = type;
  }

  getDevelopers() {
    return this.developers.filter(item => item.type === this.type);
  }

  getProjects() {
    return this.projects.filter(item => item.type === this.type);
  }

  getDevelopersFree() {
    return this.developers.filter(item => item.type === this.type && item.status === 'free');
  }

  getDevelopersBusy() {
    return this.developers.filter(item => item.type === this.type && item.status === 'busy');
  }

  getProjectsFree() {
    return this.projects.filter(item => item.type === this.type && item.status === 'free');
  }

  getProjectsBusy() {
    return this.projects.filter(item => item.type === this.type && item.status === 'busy');
  }

  resetNeedDevelopers() {
    this.needDevelopers = 0;
  }

  getNeedDevelopers() {
    return this.needDevelopers;
  }

  incrementNeedDevelopers() {
    this.needDevelopers += 1;
  }
}

class WebDepartment extends Department {
  constructor(employees, projects, needDevelopers = 0, type = 'web') {
    super(employees, projects, needDevelopers, type);
  }

  getEmployeesForDelete() {
    function compareExperience(employee1, employee2) {
      return employee1.experience - employee2.experience;
    }
    return this.developers
      .filter(item => item.status === 'free' && item.freeDays > 2)
      .sort(compareExperience);
  }

  developmentWebProjects() {
    this.getProjectsFree().forEach((itemWebProject) => {
      if (this.getDevelopersFree().length > 0) {
        itemWebProject.setBusyDays(itemWebProject.complexity);
        itemWebProject.developmentProject();
        this.getDevelopersFree()[0].getProject(itemWebProject.complexity);
      } else {
        this.incrementNeedDevelopers();
      }
    });

    this.getDevelopersFree().forEach((itemFreeDevelopers) => {
      itemFreeDevelopers.incrementFreeDays();
    });

    this.getProjectsBusy().forEach((itemBusyProject) => {
      itemBusyProject.decrementBusyDays();
      itemBusyProject.developmentProject();
    });

    this.getDevelopersBusy().forEach((itemBusyDevelopers) => {
      itemBusyDevelopers.decrementBusyDays();
      itemBusyDevelopers.changeStatusOfBusy();
    });
  }
}

class MobDepartment extends Department {
  constructor(employees, projects, needDevelopers = 0, type = 'mob') {
    super(employees, projects, needDevelopers, type);
  }

  getEmployeesForDelete() {
    function compareExperience(employee1, employee2) {
      return employee1.experience - employee2.experience;
    }
    return this.developers
      .filter(item => item.status === 'free' && item.freeDays > 2)
      .sort(compareExperience);
  }

  developmentMobProjects() {
    this.getProjectsFree().forEach((itemMobProject) => {
      if (this.getDevelopersFree().length >= itemMobProject.complexity) {
        itemMobProject.setBusyDays(1);
        itemMobProject.developmentProject();
        for (let i = 0; i < itemMobProject.complexity; i += 1) {
          this.getDevelopersFree()[0].getProject(1);
        }
      } else {
        for (let i = 0; i < itemMobProject.complexity; i += 1) {
          this.incrementNeedDevelopers();
        }
      }
    });

    this.getDevelopersFree().forEach((itemFreeDevelopers) => {
      itemFreeDevelopers.incrementFreeDays();
    });

    this.getProjectsBusy().forEach((itemBusyProject) => {
      itemBusyProject.decrementBusyDays();
      itemBusyProject.developmentProject();
    });
    this.getDevelopersBusy().forEach((itemBusyDevelopers) => {
      itemBusyDevelopers.decrementBusyDays();
      itemBusyDevelopers.changeStatusOfBusy();
    });
  }
}

class QaDepartment extends Department {
  constructor(employees, projects, needDevelopers = 0, type = 'qa') {
    super(employees, projects, needDevelopers, type);
  }

  getQaProjects() {
    return this.projects.filter(item => item.status === 'completed');
  }

  getQaApprovedProjects() {
    return this.projects.filter(item => item.status === 'qaApproved');
  }


  getEmployeesForDelete() {
    function compareExperience(employee1, employee2) {
      return employee1.experience - employee2.experience;
    }
    return this.developers
      .filter(item => item.status === 'free' && item.freeDays > 2)
      .sort(compareExperience);
  }

  developmentQaProjects() {
    this.getQaProjects().forEach((itemQaProject) => {
      if (this.getDevelopersFree().length > 0) {
        itemQaProject.setBusyDays(0);
        itemQaProject.developmentOfQa();
        this.getDevelopersFree()[0].getProject(1);
      } else {
        this.incrementNeedDevelopers();
      }
    });

    this.getDevelopersFree().forEach((itemFreeDevelopers) => {
      itemFreeDevelopers.incrementFreeDays();
    });

    this.getQaProjects().forEach((itemBusyProject) => {
      itemBusyProject.developmentOfQa();
    });

    this.getDevelopersBusy().forEach((itemBusyDevelopers) => {
      itemBusyDevelopers.decrementBusyDays();
      itemBusyDevelopers.changeStatusOfBusy();
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
    this.qaDepartament = new QaDepartment(this.employees, this.projects);
  }

  work(allDays) {
    for (let i = 1; i <= allDays; i += 1) {
      this.director.getProjects(this.projects);

      this.webDepartmentWork();
      this.mobDepartmentWork();
      this.qaDepartmentWork();
    }
    this.getStatistica(allDays);
  }

  webDepartmentWork() {
    this.webDepartment.developmentWebProjects();
    for (let i = 0; i < this.webDepartment.getNeedDevelopers(); i += 1) {
      this.director.addEmployee(this.employees, new WebDeveloper());
    }
    this.webDepartment.resetNeedDevelopers();
    if (this.webDepartment.getEmployeesForDelete().length > 0) {
      this.director.deleteEmployee(
        this.webDepartment.getEmployeesForDelete()[0],
        this.webDepartment.getEmployeesForDelete()[0].getId(),
      );
    }
  }

  mobDepartmentWork() {
    this.mobDepartment.developmentMobProjects();
    for (let i = 0; i < this.mobDepartment.getNeedDevelopers(); i += 1) {
      this.director.addEmployee(this.employees, new MobDeveloper());
    }
    this.mobDepartment.resetNeedDevelopers();

    if (this.mobDepartment.getEmployeesForDelete().length > 0) {
      this.director.deleteEmployee(
        this.mobDepartment.getEmployeesForDelete()[0],
        this.mobDepartment.getEmployeesForDelete()[0].getId(),
      );
    }
  }

  qaDepartmentWork() {
    if (this.qaDepartament.getQaProjects().length > 0) {
      this.qaDepartament.developmentQaProjects();
      for (let i = 0; i < this.qaDepartament.getNeedDevelopers(); i += 1) {
        this.director.addEmployee(this.employees, new QaDeveloper());
      }
      this.qaDepartament.resetNeedDevelopers();
      if (this.qaDepartament.getEmployeesForDelete().length > 0) {
        this.director.deleteEmployee(
          this.qaDepartament.getEmployeesForDelete()[0],
          this.qaDepartament.getEmployeesForDelete()[0].getId(),
        );
      }
    }
  }

  getStatistica(allDays) {
    console.log(`Фирма работает:          ${allDays}`);
    console.log(`Выполнено проектов:      ${this.qaDepartament.getQaApprovedProjects().length}`);
    console.log(`Принято разработчиков:   ${this.director.getAddEmployees()}`);
    console.log(`Уволено разработчиков:   ${this.director.getDeleteEmployees()}`);
  }
}

const company = new Company();

company.work(365);
