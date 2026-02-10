from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# CustomUserManager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # This hashes the password
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(email, password, **extra_fields)
    
# User Class
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=40)
    location = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    avatar_url=models.URLField(blank=True, null=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    def __str__(self):
        return self.email

# # Serivce Class
# class Service(models.Model):
    
#     requester = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE,
#         related_name='requested_services'
#     )
    
#     fulfiller = models.ForeignKey(
#         User, 
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True,
#         related_name='fulfullied_services'
#     )
    
#     title = models.CharField(max_length=50)
#     description = models.TextField()
#     location = models.CharField(max_length=50)
    
#     Status_Choices = [
#         ('assigned', 'Assigned'),
#         ('completed', 'Completed'),
#         ('pending', 'Pending'),
#     ]
    
#     status = models.CharField(
#         max_length=15,
#         choices=Status_Choices,
#         default='pending'
#     )
    
#     message = models.CharField(max_length=500)
#     created_at = models.DateTimeField(auto_now_add=True)
    

# # ServiceProposal class
# class ServiceProposal(models.Model):
    
#     service = models.ForeignKey(
#         Service,
#         on_delete=models.CASCADE,
#         related_name='proposals'
#     )
    
#     responder = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE,
#         related_name='service_proposals'
#     )
    
#     message = models.CharField(max_length=250)
#     created_at = models.DateTimeField(auto_now_add=True)
    
    

    

class Post(models.Model):
    creator=models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

    POST_TYPE_CHOICES = [("RUNNER", "RUNNER" ), ("SEEKER", "SEEKER")]
    post_type=models.CharField(max_length=10, choices=POST_TYPE_CHOICES)

    title=models.CharField(max_length=255)
    description=models.TextField()
    location=models.CharField(max_length=255)

    trip_date=models.DateField(null=True, blank=True)
    trip_time=models.TimeField(null=True, blank=True)

    STATUS_CHOICES = [ ("OPEN", "OPEN"), ("IN_PROGRESS", "IN_PROGRESS"), 
                        ("COMPLETED", "COMPLETED"), ("CANCELLED", "CANCELLED")]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="OPEN")

    tags= models.JSONField(default=list, blank=True)

    created_at =models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


class Proposal(models.Model):
    post= models.ForeignKey(Post, on_delete=models.CASCADE, related_name="proposals")

    proposer=models.ForeignKey(User, on_delete=models.CASCADE, related_name="proposals")

    message=models.TextField()

    offered_price=models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    PROPOSAL_STATUS_CHOICES = [("PENDING", "PENDING"), ("ACCEPTED", "ACCEPTED"),
                                ("REJECTED", "REJECTED"), ("WITHDRAWN", "WITHDRAWN")]
    status = models.CharField(max_length=20, choices=PROPOSAL_STATUS_CHOICES, default="PENDING")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at =models.DateTimeField(auto_now=True)



class Chat(models.Model):
    post=models.ForeignKey(Post, on_delete=models.CASCADE, related_name="chats")

    proposal=models.ForeignKey(Proposal, on_delete=models.SET_NULL, null=True, blank=True,
                               related_name="chat")

    participant_one = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                                        blank=True, related_name="chats_as_one")
    
    participant_two =models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                                       blank=True, related_name="chats_as_two")
    
    STATUS_CHOICES= [ ("ACTIVE", "ACTIVE"), ("CANCELLED", "CANCELLED"), ("COMPLETED", "COMPLETED")]
    status= models.CharField(max_length=15, choices=STATUS_CHOICES, default="ACTIVE")

    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


# Message Class
class Message(models.Model):
    
    chat = models.ForeignKey(
            Chat,
            on_delete=models.CASCADE,
            related_name='messages'
        )
        
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )
    
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.sender.email}: {self.content[:50]}"