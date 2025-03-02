# ServiceBridge Platform

## Dependencies

This project uses specific versions of key dependencies to ensure stability:

- Tailwind CSS: 3.3.5
- PostCSS: 8.4.31
- Autoprefixer: 10.4.16

### Important Notes

- Do not update these dependencies without testing in a development environment first
- Use `npm ci` instead of `npm install` to ensure exact versions are installed
- Node.js version >= 18.0.0 is required

## Development

```bash
# Install dependencies (use this instead of npm install)
npm ci

# Start development server
npm run dev
```

### Before Updating Dependencies

1. Create a new branch
2. Update dependencies one at a time
3. Test thoroughly
4. Document any breaking changes
5. Update this README if versions change 