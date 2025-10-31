# Poke-Actions

A GitHub Action that rewards issue contributors with Pokémon! 

## 🚧 Work in Progress

This action is currently under development.

## 💡 Concept

When someone opens an issue, a wild Pokémon appears. When someone closes it, they catch a random Pokémon!

### Issue Opened
> 🌿 **@username found a wild Pokémon!**  
> Who is going to catch it? Complete this issue to find out! 👀

### Issue Closed
> 🎉 **Congratulations @username!**  
> You caught **Pikachu**!  
> ![Pikachu](sprite)

## 🛠️ Development Setup
```bash
# Install dependencies
pnpm install

# Build the action
pnpm run build
```

## 📦 Usage (Coming Soon)
```yaml
name: Poke-Actions
on:
  issues:
    types: [opened, closed]

jobs:
  pokemon:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - uses: your-username/poke-actions@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
