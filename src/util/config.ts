import dotenv from 'dotenv';

class Environent {
    public static getString(key: string, optional?: false): string;
    public static getString(key: string, optional: true): string | undefined;
    public static getString(key: string, optional?: boolean) {
        const value = process.env[key];
        if (value === undefined && !optional) {
            throw new Error(
                `A value for environment variable '${key}' could not be found. Did you forget to specify a value?`,
            );
        }
        return process.env[key];
    }
}

dotenv.config();

const config = {
    GITHUB_PERSONAL_ACCESS_TOKEN: Environent.getString(
        'GITHUB_PERSONAL_ACCESS_TOKEN',
    ),
    GITHUB_REPO_NAME: Environent.getString('GITHUB_REPO_NAME'),
};

export { config };
