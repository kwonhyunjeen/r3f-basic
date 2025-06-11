# R3F Basic

This project is a basic implementation using React Three Fiber (R3F), showcasing various 3D scenes with different functionalities.

## Features

- Basic scene setup with React Three Fiber
- Various material demonstrations
- Lighting techniques showcase
- Interactive sidebar navigation
- Custom matcap materials (blue, gold, red, silver)

## Project Structure

```
src/
  ├── components/            # Reusable components
  │   ├── SceneTemplate.tsx  # Template for consistent scene layout
  │   └── Sidebar.tsx        # Navigation sidebar
  ├── pages/                 # Different scene implementations
  │   ├── BasicScene.tsx     # Fundamental 3D scene
  │   ├── LightsScene.tsx    # Demonstrates lighting techniques
  │   └── MaterialsScene.tsx # Showcases different materials
  └── main.tsx               # Entry point
```

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

## Deployment

This project is deployed using Vercel. You can view the deployed project at [https://react-three-fiber-basic.vercel.app](https://react-three-fiber-basic.vercel.app)

## Built With

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and development server
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React renderer for Three.js
- [Three.js](https://threejs.org/) - 3D library

## License

This project is licensed under the MIT License
