from django.shortcuts import render


def index(request):
    return render(request, 'signup.html', {'title': 'SIGNUP', 'style': '/Style.css'})


def login(request):
    return render(request, 'login.html', {'title': 'LOGIN', 'style': '/login.css'})


def userpage(request):
    return render(request, 'userpage.html', {'title': 'USERPAGE', 'style': '/userpage.css', 'profile': '/Ellipse 1.png'})


def update(request):
    return render(request, 'update.html', {'title': 'UPDATE', 'style': '/update.css'})


def video(request):
    return render(request, 'starting.html', {'title': 'START - VIDEO', 'style': '/starting.css'})


def audio(request):
    return render(request, 'audioStarting.html', {'title': 'START - AUDIO', 'style': '/audioStarting.css'})


def callVideo(request):
    return render(request, 'dashboard.html', {'title': 'VIDEO', 'style': '/starting.css'})


def callAudio(request):
    return render(request, 'audioStarting.html', {'title': 'AUDIO', 'style': '/audioStarting.css'})
