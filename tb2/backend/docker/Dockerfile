FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /build
COPY pom.xml ./
COPY shared-kernel/pom.xml shared-kernel/
COPY iam-context/pom.xml iam-context/
COPY identity-context/pom.xml identity-context/
COPY catalog-context/pom.xml catalog-context/
COPY worker-context/pom.xml worker-context/
COPY application/pom.xml application/
COPY . .
RUN apk add --no-cache maven && mvn clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN apk add --no-cache curl tini
COPY --from=builder /build/application/target/yaquedo-app.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["/sbin/tini", "--", "java", "-jar", "app.jar"]
