# Les Racines d'Or - Site Vitrine Gastronomique

![Restaurant Preview](https://imgix.cosmicjs.com/da03a280-9a5e-11f0-bba7-d56988718db7-photo-1517248135467-4c7edcad34c4-1758839262203.jpg?w=1200&h=300&fit=crop&auto=format,compress)

Une vitrine web élégante et moderne pour le restaurant gastronomique fictif "Les Racines d'Or", construite avec Next.js 15 et alimentée par Cosmic CMS. Cette application présente l'expérience culinaire raffinée avec un design sophistiqué reflétant l'ambiance chaleureuse et élégante du restaurant.

## ✨ Fonctionnalités

- **Menu Gastronomique Interactif** - Présentation élégante des entrées, plats et desserts avec images haute qualité
- **Présentation du Chef & Équipe** - Profils détaillés d'Antoine Dubois et de son équipe passionnée
- **Témoignages Clients** - Avis authentiques avec système de notation par étoiles
- **Cave à Vins Premium** - Sélection de vins avec descriptions et accords mets-vins
- **Informations Pratiques** - Horaires, coordonnées et informations de réservation
- **Design Responsive** - Expérience optimale sur desktop, tablette et mobile
- **Animations Subtiles** - Transitions fluides et interactions élégantes
- **Optimisation Images** - Chargement rapide avec optimisation Imgix automatique

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d5b8dde4b13704227fb63e&clone_repository=68d5c362e4b13704227fb673)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Créer un contenu structuré pour un restaurant gastronomique fictif nommé "Les Racines d'Or". Le contenu inclura :
> 
> 1. Restaurant Info  
>    - Nom : Les Racines d'Or  
>    - Description : restaurant gastronomique contemporain au cœur de la ville, expérience culinaire raffinée, ambiance chaleureuse et élégante  
>    - Horaires : 12h-15h, 19h-23h  
>    - Coordonnées : adresse fictive + téléphone + email
> 
> 2. Chef  
>    - Nom : Antoine Dubois  
>    - Portrait (placeholder)  
>    - Bio courte : chef passionné par la cuisine raffinée et les produits locaux
> 
> 3. Plats  
>    - Entrées : Saint-Jacques rôties, Foie gras poêlé  
>    - Plats : Pigeon de Bresse aux cèpes  
>    - Desserts : Sphère chocolat Valrhona  
>    - Vins : Champagne Dom Pérignon 2012  
>    - Chaque plat : photo (placeholder), nom, description courte, prix fictif
> 
> 4. Galerie  
>    - Salle principale éclairée  
>    - Art de dresser  
>    - Photos immersives de plats et ambiance (placeholders)
> 
> 5. Témoignages  
>    - Sophie Martin, Jean-Pierre Durand, Marie Dubois  
>    - Texte : avis fictifs sur l'expérience culinaire
> 
> 6. Équipe  
>    - Marie Lefevre – Sommelier  
>    - Pierre Moreau – Maître d'hôtel  
>    - Portraits (placeholders)
> 
> Générer tous les objets dans le bucket Cosmic avec images placeholders et textes prêts à utiliser dans un site vitrine. Style premium, élégant et cohérent avec une palette vert profond, doré et blanc cassé."

### Code Generation Prompt

> "Based on the content model I created for "Créer un contenu structuré pour un restaurant gastronomique fictif nommé "Les Racines d'Or"...", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Next.js 15** - React framework avec App Router
- **TypeScript** - Type safety et développement robuste
- **Tailwind CSS** - Framework CSS utilitaire pour le design
- **Cosmic CMS** - Headless CMS pour la gestion de contenu
- **Framer Motion** - Animations fluides et interactions
- **React Icons** - Icônes vectorielles élégantes

## 🚀 Getting Started

### Prérequis

- Node.js 18+ ou Bun
- Un bucket Cosmic avec le contenu "Les Racines d'Or"

### Installation

1. Clonez ce repository
```bash
git clone <repository-url>
cd les-racines-dor
```

2. Installez les dépendances
```bash
bun install
```

3. Configurez les variables d'environnement
```bash
cp .env.example .env.local
```

Ajoutez vos clés Cosmic :
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Lancez le serveur de développement
```bash
bun run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📚 Exemples Cosmic SDK

### Récupérer les informations du restaurant
```typescript
import { cosmic } from '@/lib/cosmic'

const restaurantInfo = await cosmic.objects
  .find({ type: 'restaurant-info' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Récupérer le menu par catégorie
```typescript
const entrees = await cosmic.objects
  .find({ 
    type: 'menu',
    'metadata.category': 'entrees'
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Récupérer l'équipe complète
```typescript
const team = await cosmic.objects
  .find({ type: 'team' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## 🎨 Intégration Cosmic CMS

L'application utilise 6 types d'objets Cosmic :

- **restaurant-info** (singleton) - Informations générales du restaurant
- **chef** - Profil du chef exécutif
- **menu** - Plats avec catégories (entrées, plats, desserts)
- **wines** - Sélection de vins avec types et millésimes
- **team** - Membres de l'équipe avec rôles
- **testimonials** - Témoignages clients avec notation

Chaque type d'objet inclut des metafields appropriés pour les images, descriptions, prix et informations spécialisées.

## 🌐 Deployment Options

### Vercel (Recommandé)
1. Push le code sur GitHub
2. Connectez votre repository à Vercel
3. Configurez les variables d'environnement
4. Déployez automatiquement

### Netlify
1. Build command: `bun run build`
2. Publish directory: `.next`
3. Configurez les variables d'environnement

Pour la production, configurez ces variables d'environnement dans le dashboard de votre plateforme d'hébergement.

<!-- README_END -->