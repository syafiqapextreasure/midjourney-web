Ubuntu 18.

# Node 16

```
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
```

```
sudo apt -y install nodejs
```

# Dependencies

Inside the project folder:

```
npm i
```

# Environment

```
cp example.env .env
```

```
vim .env
```

Add your Discord Auth token, Channel ID, and Discord Bot Token

# Run 

```
npm run dev
```