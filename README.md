[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Poke%20Actions-blue?logo=github)](https://github.com/marketplace/actions/poke-actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# <img src="./assets/pokemon/058.png" alt="Growlithe" width="52" align="left"> Poke Actions

GitHub & Pokémon! Every time someone closes an issue, they catch a random Pokémon from Generation 1.


## ✨ Features

- 🌿 Wild Pokémon appear when issues or pull requests are opened
- 🎉 Random Pokémon are caught when issues close or PRs are merged
- 💨 Pokémon flee when PRs are closed without merging
- 🎲 Fully random selection from all 151 Gen 1 Pokémon
- ⚡ Zero configuration required
- 🎯 Self-contained - no external APIs


## 🚀 Quick Start

Create `.github/workflows/poke-actions.yml` in your repository:

```yaml
name: Poke Actions
on:
  issues:
    types: [opened, closed]
  pull_request:
    types: [opened, closed]

jobs:
  pokemon:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - uses: DanielYuki/poke-actions@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

That's it! 🎊


## 📸 How It Works

**Issue opened:**
> 🌿 **@alice found a wild Pokémon!**  

**Issue closed:**
> 🎉 **Congratulations @bob!**  
> You caught **Pikachu**!  
> <img src="./assets/pokemon/025.png" alt="Pikachu" width="68">

**Pull request opened:**
> 🌿 **@charlie found a wild Pokémon!**  

**Pull request merged:**
> 🎉 **Congratulations @charlie!**  
> You caught **Pikachu**!  
> <img src="./assets/pokemon/025.png" alt="Pikachu" width="68">  
> _Merged by @diana_

**Pull request closed (not merged):**
> 💨 **The wild pokémon fled!**


## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🚧 Work in Progress

- [x] **PR Support** - Add Pokémon rewards for merged pull requests
- [ ] **Custom Messages** - Allow repository owners to customize catch messages
- [ ] **Rare Pokémon** - Special rewards for significant contributions (first-time contributors, large PRs, etc.)
- [ ] **Shiny Variants** - Rare shiny Pokémon for special occasions
- [ ] **Multi-language Support** - i18n for different languages
- [ ] **Configuration File** - YAML config file for advanced customization


## 📜 License

**Code:** MIT License - see [LICENSE](LICENSE)

**Sprites:** Pokémon game assets © Nintendo / Game Freak / The Pokémon Company. Used for educational and fan purposes under fair use.

---

<div align="center">
  
**Made with ❤️ for the Pokémon community**

[Report Bug](https://github.com/DanielYuki/poke-actions/issues) · [Request Feature](https://github.com/DanielYuki/poke-actions/issues)

</div>