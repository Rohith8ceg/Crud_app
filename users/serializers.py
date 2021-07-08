from rest_framework import serializers 
from users.models import User
 
 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'name', 'role', 'email', 'password')

    def validate(self, attrs):
        username = attrs.get('username', '')
        email = attrs.get('email', '')
        if User.objects.filter(username=username).exists():
            if attrs.get('id', '') is not None:
                pass
            else:
                raise serializers.ValidationError(
                {'username': ('Username is already taken!')})
        if User.objects.filter(email=email).exists():
            if attrs.get('id', '') is not None:
                pass
            else:
                raise serializers.ValidationError(
                    {'email': ('Email is already taken!')})
        return super().validate(attrs)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)