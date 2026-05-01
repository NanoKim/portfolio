export type Project = {
  title: string;
  period: string;
  customer: string;
  affiliation: string;
  role: string[];
  charge: string[];
  language: string[];
  frontend: string[];
  backend: string[];
  database: string[];
  etc: string[];
};

export const SECTIONS: Project[] = [
  {
    title: "상시 감시 시스템 구축",
    period: "2026.04 ~ 現",
    customer: "신한카드",
    affiliation: "유브갓프렌즈",
    role: ["개발"],
    charge: ["Backend"],
    language: ["Java", "JavaScript"],
    frontend: ["jQuery", "Ajax"],
    backend: ["Spring Boot", "Thymeleaf"],
    database: ["Oracle"],
    etc: ["MyBatis", "Orange"]
  },
  {
    title: "금융 책무구조도 관리 솔루션 구축",
    period: "2026.01 ~ 2026.04 (4M)",
    customer: "자사 솔루션",
    affiliation: "로이솔루션",
    role: ["분석", "설계", "개발"],
    charge: ["Frontend", "Backend", "Server"],
    language: ["Java", "TypeScript", "JavaScript"],
    frontend: ["Vue", "Nuxt", "Pinia"],
    backend: ["Spring Boot", "Node.js", "Nginx"],
    database: ["PostgreSQL"],
    etc: ["Linux", "MyBatis", "Rsync", "Git", "DBeaver", "Keepalived", "repmgr"]
  },
  {
    title: "책무구조도 운영 시스템 구축",
    period: "2025.03 ~ 2025.12 (10M)",
    customer: "카카오뱅크",
    affiliation: "로이솔루션",
    role: ["분석", "설계", "개발"],
    charge: ["Frontend", "Backend", "Batch"],
    language: ["Java", "TypeScript", "JavaScript"],
    frontend: ["Vue", "Nuxt", "Pinia"],
    backend: ["Spring Boot", "Node.js", "Nginx"],
    database: ["Oracle"],
    etc: ["Docker", "MyBatis", "GitLab", "DBeaver", "jira", "Da#", "Cronjob"]
  },
  {
    title: "연결회계 시스템 고도화 구축",
    period: "2024.12 ~ 2025.02 (3M)",
    customer: "키움증권",
    affiliation: "로이솔루션",
    role: ["개발"],
    charge: ["Frontend", "Backend"],
    language: ["Java", "JavaScript"],
    frontend: ["JSP", "jQuery", "Ajax"],
    backend: ["Spring Boot", "Node.js"],
    database: ["MariaDB"],
    etc: ["Tomcat", "Eclipse", "MyBatis", "HeidiSQL", "SVN"]
  },
  {
    title: "예산 자산 시스템 고도화 구축",
    period: "2024.05 ~ 2024.11 (7M)",
    customer: "카카오뱅크",
    affiliation: "로이솔루션",
    role: ["개발"],
    charge: ["Frontend", "Backend", "Batch"],
    language: ["Java", "TypeScript", "JavaScript"],
    frontend: ["Vue", "Nuxt", "Pinia"],
    backend: ["Spring Boot", "Node.js", "Nginx"],
    database: ["Oracle"],
    etc: ["MyBatis", "GitLab", "Orange", "jira", "Da#"]
  },
];