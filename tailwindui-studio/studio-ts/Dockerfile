# ---------- BASE COMMUNE (pour deps + build) ----------
FROM node:20-slim AS base

WORKDIR /app
ENV NODE_ENV=production

# Installer pnpm globalement (sans Corepack)
RUN npm install -g pnpm@10.25.0

# ---------- ETAPE DEPS : INSTALL DES DEPENDANCES ----------
FROM base AS deps

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json pnpm-lock.yaml* ./

# Installer toutes les dépendances (prod + dev pour le build)
RUN pnpm install --prefer-frozen-lockfile || pnpm install

# ---------- ETAPE BUILD ----------
FROM base AS builder

WORKDIR /app

# Récupérer node_modules installés
COPY --from=deps /app/node_modules ./node_modules

# Copier tout le code source
COPY . .

# S'assurer que /app/public existe (même vide)
RUN mkdir -p public

# Build de l'app Next
RUN pnpm build

# ---------- ETAPE RUNNER (IMAGE FINALE) ----------
FROM node:20-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Créer un user non-root
RUN addgroup --system nodejs \
  && adduser --system --ingroup nodejs nextjs

# Copier uniquement ce qui est nécessaire pour run
COPY package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# (Optionnel) si tu as un next.config.* et que tu en as besoin en prod :
# COPY next.config.mjs ./next.config.mjs
# COPY next.config.js ./next.config.js

# 🔥 IMPORTANT : donner les droits à nextjs sur /app (pour .next/cache/images)
RUN chown -R nextjs:nodejs /app

USER nextjs

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

# Pas de pnpm au runtime -> on lance directement Next avec node
CMD ["node", "node_modules/next/dist/bin/next", "start"]
