class Student():
    studentId: str
    name: str
    email: str
    phone: str
    college: str
    degree: str
    branch: str
    graduationYear: int
    skills: list[str]
    interests: list[str]
    resume: str
    profileComplete: bool


class Company():
    companyId: str
    name: str
    email: str
    phone: str
    industry: str
    description: str
    location: str
    website: str


class Internship():
    internshipId: str
    companyId: str
    title: str
    description: str
    location: str
    workMode: str
    duration: str
    stipend: float
    requiredSkills: list[str]
    eligibilityCriteria: str
    applicationDeadline: str
    status: str


class Application():
    applicationId: str
    studentId: str
    internshipId: str
    appliedDate: str
    status: str


class SkillAssessment():
    assessmentId: str
    studentId: str
    skills: list[str]
    scores: list[int]
    skillGaps: list[str]
    assessmentDate: str


class Academician():
    academicianId: str
    name: str
    email: str
    phone: str
    college: str
    department: str
    designation: str
    expertise: list[str]