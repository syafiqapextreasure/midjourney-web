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

# Vtracer for converting Svg

```
sudo apt install git build-essential
```

```
curl https://sh.rustup.rs -sSf | sh
```

Use default installation

```
source $HOME/.cargo/env
```

```
cargo install vtracer
```

# Environment

```
cp example.env .env
```

```
vim .env
```

Add your Discord Auth token, Channel ID, Discord Bot Token, AND your vtracer dir using `which vtracer`

# Run 

```
npm run dev
```

# Production

```
pm2 start npm -- run dev
```