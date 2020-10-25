export function generateDockerImageName(dockerImage: string, tag: string, registry?: string) {
    return registry ? `${registry}/${dockerImage}:${tag}` : `${dockerImage}:${tag}`;
}
