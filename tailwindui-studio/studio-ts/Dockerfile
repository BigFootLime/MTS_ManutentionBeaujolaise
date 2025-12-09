# ---------- BASE COMMUNE ----------
FROM node:20-slim AS base

WORKDIR /app
ENV NODE_ENV=production

# Installer pnpm globalement (sans corepack)
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

# Copier le code source
COPY . .

# S'assurer que /app/public existe (même vide)
RUN mkdir -p public

# Build de l'app Next
RUN pnpm build

# ---------- ETAPE RUNNER (IMAGE FINALE) ----------
FROM base AS runner

# Créer un user non-root avec un vrai HOME
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --home /home/nextjs nextjs

WORKDIR /app

# HOME du user
ENV HOME=/home/nextjs

# Copier ce qui est nécessaire pour faire tourner l'app
COPY package.json pnpm-lock.yaml* ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY next.config.* ./ || true

USER nextjs

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["pnpm", "start"]
