
Build web image
```bash
docker build -t registry.pawzd.net/alcoholics/frontend -f WebDockerfile .
```
Push
```bash
docker push registry.pawzd.net/alcoholics/frontend
```

Build with eas
```bash
ANDROID_HOME=~/Android/ eas build --local 
```

For apk
```bash
ANDROID_HOME=~/Android/ eas build --local -p android --profile preview
```