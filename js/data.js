// DevOps Projects Data
const devopsProjects = [
    {
        id: 1,
        title: "Multi-Cloud CI/CD Pipeline",
        description: "Build a comprehensive CI/CD pipeline that works across AWS, Azure, and GCP using GitHub Actions, Terraform, and Docker.",
        difficulty: "advanced",
        category: "CI/CD",
        tools: ["GitHub Actions", "Terraform", "Docker", "AWS", "Azure", "GCP"],
        popularity: 95,
        upvotes: 0,
        implementation: [
            "Set up GitHub Actions workflows for different cloud providers",
            "Use Terraform to provision infrastructure on each cloud",
            "Create Docker images for your applications",
            "Implement blue-green deployment strategy",
            "Set up monitoring and alerting"
        ],
        useCase: "Perfect for organizations that need to avoid vendor lock-in and maintain flexibility across cloud providers."
    },
    {
        id: 2,
        title: "Kubernetes Cluster Monitoring Dashboard",
        description: "Create a real-time monitoring dashboard for Kubernetes clusters using Prometheus, Grafana, and custom metrics.",
        difficulty: "intermediate",
        category: "Monitoring",
        tools: ["Kubernetes", "Prometheus", "Grafana", "Helm", "YAML"],
        popularity: 88,
        upvotes: 0,
        implementation: [
            "Deploy Prometheus operator using Helm",
            "Configure ServiceMonitors for pod metrics",
            "Set up Grafana with pre-built dashboards",
            "Create custom alerts for resource usage",
            "Implement log aggregation with Loki"
        ],
        useCase: "Essential for production Kubernetes environments to track performance, resource usage, and troubleshoot issues."
    },
    {
        id: 3,
        title: "Infrastructure as Code with Terraform",
        description: "Learn to provision and manage cloud infrastructure using Terraform with best practices and modular design.",
        difficulty: "beginner",
        category: "IAC",
        tools: ["Terraform", "AWS", "YAML", "Git"],
        popularity: 92,
        upvotes: 0,
        implementation: [
            "Install Terraform and configure AWS credentials",
            "Create main.tf, variables.tf, and outputs.tf files",
            "Define VPC, subnets, and security groups",
            "Use modules for reusable components",
            "Implement state management with remote backend"
        ],
        useCase: "Ideal for teams wanting to version control infrastructure and ensure consistency across environments."
    },
    {
        id: 4,
        title: "Docker Compose Multi-Service Application",
        description: "Build a complete application stack using Docker Compose with database, backend API, and frontend services.",
        difficulty: "beginner",
        category: "Containers",
        tools: ["Docker", "Docker Compose", "YAML", "Linux"],
        popularity: 85,
        upvotes: 0,
        implementation: [
            "Create Dockerfile for each service",
            "Write docker-compose.yml with all services",
            "Configure networking between containers",
            "Set up volumes for data persistence",
            "Implement health checks and restart policies"
        ],
        useCase: "Great for local development environments and small-scale deployments."
    },
    {
        id: 5,
        title: "Automated Server Backup System",
        description: "Develop a robust backup solution using bash scripts, cron jobs, and cloud storage integration.",
        difficulty: "intermediate",
        category: "Linux",
        tools: ["Bash", "Linux", "Cron", "AWS S3", "Git"],
        popularity: 78,
        upvotes: 0,
        implementation: [
            "Write bash script for backup operations",
            "Configure cron jobs for scheduled backups",
            "Integrate with AWS S3 or similar storage",
            "Implement backup rotation and cleanup",
            "Add email notifications for backup status"
        ],
        useCase: "Critical for any production server to ensure data recovery in case of failures."
    },
    {
        id: 6,
        title: "GitHub Actions Workflow Automation",
        description: "Create comprehensive GitHub Actions workflows for testing, building, and deploying applications.",
        difficulty: "intermediate",
        category: "GitHub Actions",
        tools: ["GitHub Actions", "YAML", "Docker", "Linux"],
        popularity: 90,
        upvotes: 0,
        implementation: [
            "Set up workflow files in .github/workflows",
            "Configure matrix builds for multiple environments",
            "Implement automated testing on pull requests",
            "Create deployment workflows for different branches",
            "Add secrets management and environment variables"
        ],
        useCase: "Perfect for open-source projects and teams using GitHub for version control."
    },
    {
        id: 7,
        title: "Cloud Cost Optimization Dashboard",
        description: "Build a dashboard to track and optimize cloud spending across multiple services and regions.",
        difficulty: "advanced",
        category: "Cloud",
        tools: ["AWS", "Python", "Grafana", "Terraform", "Linux"],
        popularity: 82,
        upvotes: 0,
        implementation: [
            "Collect cost data from cloud provider APIs",
            "Create data pipeline for cost aggregation",
            "Build visualization dashboard",
            "Implement alerting for budget thresholds",
            "Generate optimization recommendations"
        ],
        useCase: "Essential for organizations managing large cloud infrastructure budgets."
    },
    {
        id: 8,
        title: "Container Security Scanning Pipeline",
        description: "Implement automated security scanning for Docker images in CI/CD pipeline using Trivy or Clair.",
        difficulty: "intermediate",
        category: "Containers",
        tools: ["Docker", "Trivy", "GitHub Actions", "YAML", "Linux"],
        popularity: 87,
        upvotes: 0,
        implementation: [
            "Integrate Trivy scanner in CI pipeline",
            "Configure vulnerability scanning rules",
            "Set up automated blocking for critical issues",
            "Generate security reports",
            "Implement image signing and verification"
        ],
        useCase: "Critical for production deployments to ensure container security."
    },
    {
        id: 9,
        title: "Infrastructure Disaster Recovery Plan",
        description: "Design and implement a comprehensive disaster recovery solution with automated failover.",
        difficulty: "advanced",
        category: "Cloud",
        tools: ["Terraform", "AWS", "Kubernetes", "Bash", "Linux"],
        popularity: 75,
        upvotes: 0,
        implementation: [
            "Design multi-region infrastructure",
            "Implement automated backup systems",
            "Create failover scripts and procedures",
            "Set up monitoring and alerting",
            "Conduct regular DR drills"
        ],
        useCase: "Vital for business-critical applications requiring high availability."
    },
    {
        id: 10,
        title: "Linux Server Hardening Script",
        description: "Create an automated script to harden Linux servers following security best practices.",
        difficulty: "intermediate",
        category: "Linux",
        tools: ["Bash", "Linux", "SSH", "Git"],
        popularity: 80,
        upvotes: 0,
        implementation: [
            "Disable unnecessary services",
            "Configure firewall rules",
            "Set up fail2ban for SSH protection",
            "Implement automatic security updates",
            "Configure audit logging"
        ],
        useCase: "Essential for securing production servers against common attacks."
    },
    {
        id: 11,
        title: "Git Workflow Automation",
        description: "Build scripts to automate common Git operations like branch management, merging, and tagging.",
        difficulty: "beginner",
        category: "Git",
        tools: ["Git", "Bash", "Linux"],
        popularity: 73,
        upvotes: 0,
        implementation: [
            "Create scripts for branch creation and cleanup",
            "Automate merge conflict resolution",
            "Implement automated tagging for releases",
            "Set up pre-commit hooks",
            "Create changelog generation scripts"
        ],
        useCase: "Improves developer productivity and ensures consistent Git workflows."
    },
    {
        id: 12,
        title: "Multi-Environment Configuration Management",
        description: "Implement a system to manage configurations across dev, staging, and production environments.",
        difficulty: "intermediate",
        category: "IAC",
        tools: ["Terraform", "Ansible", "YAML", "Git", "Linux"],
        popularity: 77,
        upvotes: 0,
        implementation: [
            "Use Terraform workspaces for environments",
            "Implement configuration templating",
            "Set up secrets management",
            "Create environment-specific variable files",
            "Automate configuration validation"
        ],
        useCase: "Prevents configuration drift and ensures consistency across environments."
    }
];

// DevOps Tools Data
const devopsTools = [
    {
        id: 1,
        name: "Docker",
        icon: "🐳",
        description: "Containerization platform that packages applications and their dependencies into containers.",
        usedIn: "Application deployment, microservices architecture, CI/CD pipelines, local development environments",
        commands: [
            "docker build -t image-name .",
            "docker run -d -p 8080:80 image-name",
            "docker ps",
            "docker logs container-id",
            "docker-compose up -d"
        ],
        example: "docker run -d --name nginx -p 8080:80 nginx"
    },
    {
        id: 2,
        name: "Kubernetes",
        icon: "☸️",
        description: "Container orchestration platform for automating deployment, scaling, and management of containerized applications.",
        usedIn: "Production container orchestration, microservices, cloud-native applications, auto-scaling",
        commands: [
            "kubectl get pods",
            "kubectl apply -f deployment.yaml",
            "kubectl describe pod pod-name",
            "kubectl logs pod-name",
            "kubectl scale deployment app --replicas=5"
        ],
        example: "kubectl create deployment nginx --image=nginx"
    },
    {
        id: 3,
        name: "Terraform",
        icon: "🏗️",
        description: "Infrastructure as Code tool for building, changing, and versioning infrastructure safely and efficiently.",
        usedIn: "Cloud infrastructure provisioning, multi-cloud deployments, infrastructure automation",
        commands: [
            "terraform init",
            "terraform plan",
            "terraform apply",
            "terraform destroy",
            "terraform state list"
        ],
        example: "terraform apply -var 'instance_type=t3.micro'"
    },
    {
        id: 4,
        name: "Jenkins",
        icon: "🤖",
        description: "Open-source automation server for building, testing, and deploying software.",
        usedIn: "CI/CD pipelines, automated testing, continuous deployment, build automation",
        commands: [
            "jenkins-cli build job-name",
            "jenkins-cli get-job job-name",
            "jenkins-cli create-job job-name < config.xml"
        ],
        example: "Configure Jenkinsfile for automated pipeline"
    },
    {
        id: 5,
        name: "GitHub Actions",
        icon: "⚡",
        description: "CI/CD platform integrated with GitHub for automating workflows directly from your repository.",
        usedIn: "Automated testing, deployment, code quality checks, release management",
        commands: [
            "gh workflow run workflow-name",
            "gh run list",
            "gh run view run-id"
        ],
        example: "Create .github/workflows/ci.yml for automated builds"
    },
    {
        id: 6,
        name: "Ansible",
        icon: "🔧",
        description: "Automation tool for configuration management, application deployment, and task automation.",
        usedIn: "Server configuration, application deployment, infrastructure automation, orchestration",
        commands: [
            "ansible-playbook playbook.yml",
            "ansible all -m ping",
            "ansible all -a 'uptime'",
            "ansible-vault encrypt file.yml"
        ],
        example: "ansible-playbook -i inventory deploy.yml"
    },
    {
        id: 7,
        name: "Prometheus",
        icon: "📊",
        description: "Open-source monitoring and alerting toolkit designed for reliability and scalability.",
        usedIn: "Metrics collection, monitoring, alerting, time-series data storage",
        commands: [
            "prometheus --config.file=prometheus.yml",
            "curl http://localhost:9090/api/v1/query?query=up"
        ],
        example: "Configure Prometheus to scrape metrics from applications"
    },
    {
        id: 8,
        name: "Grafana",
        icon: "📈",
        description: "Open-source analytics and visualization platform for time-series data.",
        usedIn: "Dashboard creation, data visualization, monitoring, alerting",
        commands: [
            "grafana-server",
            "grafana-cli plugins install plugin-name"
        ],
        example: "Create dashboards to visualize Prometheus metrics"
    },
    {
        id: 9,
        name: "Git",
        icon: "📦",
        description: "Distributed version control system for tracking changes in source code.",
        usedIn: "Version control, collaboration, code management, branching strategies",
        commands: [
            "git clone repository-url",
            "git add .",
            "git commit -m 'message'",
            "git push origin branch-name",
            "git pull origin branch-name",
            "git branch new-branch",
            "git merge branch-name"
        ],
        example: "git checkout -b feature/new-feature"
    },
    {
        id: 10,
        name: "AWS CLI",
        icon: "☁️",
        description: "Command-line interface for Amazon Web Services to manage AWS services.",
        usedIn: "Cloud resource management, automation, scripting, infrastructure operations",
        commands: [
            "aws s3 ls",
            "aws ec2 describe-instances",
            "aws lambda invoke --function-name my-function",
            "aws cloudformation create-stack --template-body file://template.json"
        ],
        example: "aws s3 cp file.txt s3://my-bucket/"
    },
    {
        id: 11,
        name: "Helm",
        icon: "⛵",
        description: "Package manager for Kubernetes that simplifies application deployment.",
        usedIn: "Kubernetes deployments, application packaging, chart management",
        commands: [
            "helm install release-name chart-name",
            "helm upgrade release-name chart-name",
            "helm list",
            "helm uninstall release-name",
            "helm create chart-name"
        ],
        example: "helm install nginx stable/nginx-ingress"
    },
    {
        id: 12,
        name: "Bash",
        icon: "💻",
        description: "Unix shell and command language for scripting and automation.",
        usedIn: "Scripting, automation, system administration, task automation",
        commands: [
            "chmod +x script.sh",
            "./script.sh",
            "bash script.sh",
            "echo $VARIABLE",
            "if [ condition ]; then ... fi"
        ],
        example: "#!/bin/bash\necho 'Hello, DevOps!'"
    }
];

// Categories Data
const categories = [
    { name: "CI/CD", icon: "🔄", count: 0 },
    { name: "Cloud", icon: "☁️", count: 0 },
    { name: "Containers", icon: "📦", count: 0 },
    { name: "Monitoring", icon: "📊", count: 0 },
    { name: "IAC", icon: "🏗️", count: 0 },
    { name: "Linux", icon: "🐧", count: 0 },
    { name: "GitHub Actions", icon: "⚡", count: 0 },
    { name: "Git", icon: "📝", count: 0 }
];

// Calculate category counts
categories.forEach(cat => {
    cat.count = devopsProjects.filter(p => p.category === cat.name).length;
});

