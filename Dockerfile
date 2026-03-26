# --- GIAI DOAN 1: BUILD ---
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
# Bien dich code thanh file .jar (bo qua chay thu test de build nhanh)
RUN mvn package -DskipTests

# --- GIAI DOAN 2: RUN ---
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
# Chi lay file .jar tu builder (GD1)
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 80
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=80"]
