from django.core.management.base import BaseCommand
from jobs.models import Category, Location, Job


class Command(BaseCommand):
    help = 'Populates database with sample jobs'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating categories...')
        categories_data = [
            {'name': 'Technology', 'description': 'Software, IT, and Tech jobs'},
            {'name': 'Design', 'description': 'Design and creative jobs'},
            {'name': 'Marketing', 'description': 'Marketing and advertising jobs'},
            {'name': 'Management', 'description': 'Management and leadership roles'},
            {'name': 'Sales', 'description': 'Sales and business development'},
        ]
        
        for cat_data in categories_data:
            Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
        
        self.stdout.write('Creating locations...')
        locations = [
            'San Francisco, CA',
            'New York, NY',
            'Remote',
            'Los Angeles, CA',
            'Austin, TX',
            'Seattle, WA',
            'Boston, MA',
        ]
        
        for loc_name in locations:
            Location.objects.get_or_create(name=loc_name)
        
        self.stdout.write('Creating jobs...')
        
        # Get objects
        tech_cat = Category.objects.get(name='Technology')
        design_cat = Category.objects.get(name='Design')
        marketing_cat = Category.objects.get(name='Marketing')
        management_cat = Category.objects.get(name='Management')
        
        sf_loc = Location.objects.get(name='San Francisco, CA')
        ny_loc = Location.objects.get(name='New York, NY')
        remote_loc = Location.objects.get(name='Remote')
        la_loc = Location.objects.get(name='Los Angeles, CA')
        austin_loc = Location.objects.get(name='Austin, TX')
        seattle_loc = Location.objects.get(name='Seattle, WA')
        boston_loc = Location.objects.get(name='Boston, MA')
        
        jobs_data = [
            {
                'title': 'Senior Frontend Developer',
                'company': 'TechCorp Inc.',
                'description': 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building responsive web applications using React and modern JavaScript.',
                'requirements': '• 5+ years of experience with React\n• Strong TypeScript knowledge\n• Experience with modern CSS frameworks\n• Understanding of web performance optimization\n• Excellent problem-solving skills',
                'responsibilities': '• Build and maintain web applications\n• Collaborate with designers and backend developers\n• Write clean, maintainable code\n• Participate in code reviews\n• Mentor junior developers',
                'benefits': '• Competitive salary\n• Health insurance\n• 401k matching\n• Flexible work hours\n• Remote work options\n• Professional development budget',
                'category': tech_cat,
                'location': sf_loc,
                'experience_level': 'senior',
                'job_type': 'full-time',
                'salary': 120000,
            },
            {
                'title': 'UX/UI Designer',
                'company': 'Design Studio',
                'description': 'Join our creative team as a UX/UI Designer. Create beautiful and intuitive user experiences for web and mobile applications.',
                'requirements': '• 3+ years of design experience\n• Proficiency in Figma and Adobe Creative Suite\n• Strong portfolio demonstrating UX/UI work\n• Understanding of design systems\n• Excellent communication skills',
                'responsibilities': '• Design user interfaces for web and mobile\n• Create wireframes and prototypes\n• Conduct user research\n• Collaborate with developers\n• Maintain design systems',
                'benefits': '• Creative work environment\n• Latest design tools\n• Flexible schedule\n• Health benefits\n• Stock options',
                'category': design_cat,
                'location': ny_loc,
                'experience_level': 'mid',
                'job_type': 'full-time',
                'salary': 85000,
            },
            {
                'title': 'Full Stack Developer',
                'company': 'StartupXYZ',
                'description': 'Looking for a versatile Full Stack Developer who can work on both frontend and backend. Experience with Node.js, React, and databases required.',
                'requirements': '• 3+ years full stack development\n• React and Node.js expertise\n• Database design experience\n• API development skills\n• Agile methodology experience',
                'responsibilities': '• Develop full stack features\n• Design and implement APIs\n• Database optimization\n• Code reviews and testing\n• Sprint planning participation',
                'benefits': '• Startup equity\n• Remote work\n• Learning budget\n• Health insurance\n• Unlimited PTO',
                'category': tech_cat,
                'location': remote_loc,
                'experience_level': 'mid',
                'job_type': 'full-time',
                'salary': 95000,
            },
            {
                'title': 'Marketing Manager',
                'company': 'Brand Solutions',
                'description': 'Lead our marketing team and develop strategies to increase brand awareness. Experience in digital marketing and social media required.',
                'requirements': '• 5+ years marketing experience\n• Digital marketing expertise\n• Team leadership skills\n• Analytics and data-driven\n• Budget management',
                'responsibilities': '• Develop marketing strategies\n• Manage marketing team\n• Campaign planning and execution\n• ROI analysis\n• Stakeholder communication',
                'benefits': '• Competitive compensation\n• Performance bonuses\n• Health and dental\n• Professional development\n• Work-life balance',
                'category': marketing_cat,
                'location': la_loc,
                'experience_level': 'senior',
                'job_type': 'full-time',
                'salary': 90000,
            },
            {
                'title': 'Junior Software Engineer',
                'company': 'CodeWorks',
                'description': 'Great opportunity for entry-level developers to grow their skills. Work with experienced mentors on exciting projects.',
                'requirements': '• Bachelor\'s degree in CS or related field\n• Basic programming knowledge\n• Eagerness to learn\n• Problem-solving skills\n• Team player',
                'responsibilities': '• Write and test code\n• Learn from senior developers\n• Participate in code reviews\n• Debug applications\n• Contribute to team projects',
                'benefits': '• Mentorship program\n• Learning resources\n• Health insurance\n• Casual environment\n• Growth opportunities',
                'category': tech_cat,
                'location': austin_loc,
                'experience_level': 'entry',
                'job_type': 'full-time',
                'salary': 65000,
            },
            {
                'title': 'Product Manager',
                'company': 'InnovateTech',
                'description': 'Drive product strategy and roadmap for our flagship products. Work closely with engineering and design teams.',
                'requirements': '• 5+ years product management\n• Technical background preferred\n• Strategic thinking\n• Data analysis skills\n• Excellent communication',
                'responsibilities': '• Define product vision\n• Manage product roadmap\n• Prioritize features\n• Work with cross-functional teams\n• Analyze product metrics',
                'benefits': '• Executive compensation\n• Stock options\n• Flexible hours\n• Premium health coverage\n• Professional development',
                'category': management_cat,
                'location': seattle_loc,
                'experience_level': 'senior',
                'job_type': 'full-time',
                'salary': 130000,
            },
            {
                'title': 'Data Scientist',
                'company': 'Analytics Pro',
                'description': 'Analyze large datasets and build machine learning models. Strong Python and statistics background required.',
                'requirements': '• Master\'s degree in related field\n• Python and R proficiency\n• Machine learning expertise\n• Statistical analysis skills\n• SQL knowledge',
                'responsibilities': '• Build ML models\n• Analyze complex datasets\n• Create data visualizations\n• Present findings to stakeholders\n• Collaborate with engineers',
                'benefits': '• Competitive salary\n• Research budget\n• Conference attendance\n• Flexible remote work\n• Health benefits',
                'category': tech_cat,
                'location': boston_loc,
                'experience_level': 'mid',
                'job_type': 'full-time',
                'salary': 110000,
            },
            {
                'title': 'Content Writer',
                'company': 'Media Hub',
                'description': 'Create engaging content for our blog, social media, and marketing materials. SEO knowledge is a plus.',
                'requirements': '• 2+ years writing experience\n• SEO knowledge\n• Creative mindset\n• Research skills\n• Attention to detail',
                'responsibilities': '• Write blog posts and articles\n• Create social media content\n• Optimize content for SEO\n• Collaborate with marketing team\n• Edit and proofread',
                'benefits': '• Creative freedom\n• Flexible schedule\n• Remote work options\n• Health insurance\n• Writing tools provided',
                'category': marketing_cat,
                'location': remote_loc,
                'experience_level': 'entry',
                'job_type': 'full-time',
                'salary': 55000,
            },
            {
                'title': 'DevOps Engineer',
                'company': 'CloudSystems',
                'description': 'Manage and optimize our cloud infrastructure. Experience with AWS, Docker, and Kubernetes required.',
                'requirements': '• 4+ years DevOps experience\n• AWS certification preferred\n• Docker and Kubernetes expertise\n• CI/CD pipeline knowledge\n• Scripting skills',
                'responsibilities': '• Manage cloud infrastructure\n• Implement CI/CD pipelines\n• Monitor system performance\n• Automate deployment processes\n• Ensure system security',
                'benefits': '• Top-tier compensation\n• Latest technology stack\n• Certification sponsorship\n• Health and wellness\n• Remote-first culture',
                'category': tech_cat,
                'location': ny_loc,
                'experience_level': 'senior',
                'job_type': 'full-time',
                'salary': 125000,
            },
        ]
        
        for job_data in jobs_data:
            Job.objects.get_or_create(
                title=job_data['title'],
                company=job_data['company'],
                defaults=job_data
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully populated database with sample data!'))