from django.db import models

# Create your models here.
class Images(models.Model):
    id = models.AutoField('image_id', primary_key=True)
    name = models.CharField('image_name', max_length=500)
    user = models.ForeignKey('authentication.User', on_delete=models.CASCADE, default=1)
    image = models.ImageField(upload_to='images')
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name