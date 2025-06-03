import React, { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, ExternalLink, Users, FileText, Tv, Download, Play, Star, Sparkles, Eye, Brain, Search } from 'lucide-react';

// Datos reales de los desarrolladores
const developers = [
  {
    name: "Miguel Ángel Vázquez",
    title: "Lead Flutter Developer (Android/iOS) | Arquitectura de Apps, QA y Lanzamientos a Producción | Integración Backend (Python & Node.js)",
    imageUrl: "/foto_miguel.png",
    email: "miguel.stucom@gmail.com",
    linkedin: "https://www.linkedin.com/in/miguel-%C3%A1ngel-v%C3%A1zquez-7b6260185/",
    github: "https://github.com/Miguelstucom",
    description: "Especialista en desarrollo móvil multiplataforma y arquitectura de aplicaciones de alto rendimiento."
  },
  {
    name: "Samuel Robayo",
    title: "Lead Web Developer (Laravel/PHP), responsible for full-stack development, and deployment. Integrated Python APIs, optimized backend performance, and managed CI/CD workflows.",
    imageUrl: "/foto_samu.png",
    email: "samirobayo04@gmail.com",
    linkedin: "https://www.linkedin.com/in/samuel-robayo-026408255/",
    github: "https://github.com/SJRobayo",
    description: "Experto en desarrollo web full-stack y optimización de rendimiento backend."
  },
  {
    name: "Abel Pérez Jiménez",
    title: "Lead Multiplatform Application Development (Windows, macOS, Android & iOS) with Maui Blazor .NET 9.0 | Developer of Specialized Business Management Applications in Azure & Dynamics 365 Environments",
    imageUrl: "/foto_abel.PNG",
    email: "abelst1002@gmail.com",
    linkedin: "https://www.linkedin.com/in/abel-p-7430a5255/",
    github: "https://github.com/Abel1002/",
    cvUrl: "/CV_Abel_Pérez.pdf",
    description: "Desarrollador especializado en aplicaciones empresariales y entornos Microsoft Azure."
  }
];

// Componente para secciones animadas
const AnimatedSection = ({ children, className }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

// Componente de partículas flotantes
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-red-500 opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

// Componente de botón de contacto personalizado
const ContactButton = ({ icon: IconComponent, label, href, bgColor, hoverColor, download = false, onClick, dev }) => {
  const handleContactClick = (e) => {
    if (label === "Contactar" && dev) {
      e.preventDefault();
      
      // Crear el mensaje de correo
      const emailBody = `Hola ${dev.name.split(' ')[0]}, vi la presentación de Streamly AI y me interesa contactar contigo para:`;
      const mailtoLink = `mailto:${dev.email}?subject=Contacto por Streamly AI&body=${encodeURIComponent(emailBody)}`;
      
      // Copiar email al portapapeles
      navigator.clipboard.writeText(dev.email).then(() => {
        alert(`✅ Correo copiado al portapapeles!\n\n📧 ${dev.email}\n\n🔗 Abriendo cliente de correo...`);
        window.location.href = mailtoLink;
      }).catch(() => {
        // Fallback si no funciona el clipboard
        alert(`📧 Correo: ${dev.email}\n\n🔗 Abriendo cliente de correo...`);
        window.location.href = mailtoLink;
      });
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      target={download ? '_self' : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download ? href.split('/').pop() : undefined}
      onClick={handleContactClick}
      className={`flex items-center justify-center text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto ${bgColor} ${hoverColor}`}
    >
      <IconComponent size={20} className="mr-2" />
      {label}
    </a>
  );
};

// Componente de estadísticas del proyecto mejorado
const ProjectStats = () => {
  const stats = [
    { number: "10K+", label: "Películas Analizadas", icon: Tv, description: "Base de datos completa de películas" },
    { number: "95%", label: "Precisión IA", icon: Brain, description: "Algoritmos de recomendación avanzados" },
    { number: "3", label: "Plataformas", icon: Users, description: "Web, Android e iOS" },
    { number: "∞", label: "Posibilidades", icon: Sparkles, description: "Descubrimiento personalizado" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {stats.map((stat, index) => (
        <div key={index} className="text-center group">
          <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-6 rounded-xl border border-red-600/30 group-hover:border-red-500 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col justify-center">
            <stat.icon size={32} className="mx-auto mb-2 text-red-400 group-hover:text-red-300 transition-colors" />
            <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
            <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
            <div className="text-xs text-gray-500 leading-tight">{stat.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente para ver documentos
const DocumentViewer = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl h-full max-h-[95vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-gray-100 rounded-t-lg">
          <h3 className="text-lg font-semibold text-gray-800">Visualizar Documento</h3>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            ×
          </button>
        </div>
        <div className="flex-1 bg-gray-50">
          <iframe 
            src={url} 
            className="w-full h-full border-0"
            title="Documento"
          />
        </div>
      </div>
    </div>
  );
};

// Componente principal de la aplicación
function App() {
  const logoColor = "#d8372d";
  const [documentViewer, setDocumentViewer] = useState(null);

  const openDocument = (url) => {
    setDocumentViewer(url);
  };

  const closeDocument = () => {
    setDocumentViewer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-100 font-sans overflow-x-hidden">
      {/* Visualizador de documentos */}
      {documentViewer && (
        <DocumentViewer url={documentViewer} onClose={closeDocument} />
      )}

      {/* Hero Section */}
      <AnimatedSection className="min-h-screen flex flex-col items-center justify-center text-center p-8 relative">
        <FloatingParticles />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-0"></div>
        
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 md:w-[500px] md:h-[500px] rounded-full opacity-10 animate-pulse z-0"
          style={{ 
            backgroundColor: logoColor, 
            filter: 'blur(120px)', 
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        ></div>
       
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="mb-8 relative">
            <img 
              src="/Streamly-logo.png" 
              alt="Streamly Logo" 
              className="mx-auto mb-6 w-24 h-24 md:w-32 md:h-32 animate-bounce"
            />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span style={{ color: logoColor }} className="drop-shadow-2xl">Stream</span>
            <span className="text-white drop-shadow-2xl">ly</span>
            <span className="text-2xl md:text-4xl text-gray-400 ml-4">AI</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-300 mb-6 max-w-4xl mx-auto font-light">
            Revolucionando las recomendaciones cinematográficas con 
            <span className="text-red-400 font-semibold"> inteligencia artificial avanzada</span>
          </p>
          
          <p className="text-lg text-gray-400 mb-6 max-w-3xl mx-auto">
            <span className="text-red-300 font-semibold">Recomendaciones personalizadas • Descubrimiento inteligente • Escalabilidad total • Accesibilidad multiplataforma</span>
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Sistema multialgorítmico que aprende de tus gustos y te conecta con las películas perfectas para ti. 
            Despliegue en <strong>Android, iOS y Web</strong>.
          </p>

          <ProjectStats />
        </div>
      </AnimatedSection>

      {/* Sección de Presentación */}
      <AnimatedSection id="presentation-section" className="py-20 md:py-32 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 to-transparent"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <FileText size={80} className="mx-auto mb-6 text-red-500 animate-pulse" style={{ color: logoColor }}/>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Nuestra <span style={{ color: logoColor }}>Presentación</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Descubre cómo hemos revolucionado las recomendaciones cinematográficas con IA. 
            Presentación completa ante CEOs sobre tecnología, algoritmos y resultados.
          </p>
          
          {/* Imagen clickeable de la presentación */}
          <div className="mb-8 max-w-4xl mx-auto">
            <a
              href="https://www.canva.com/design/DAGpOH3wUyI/TwhERSMNOxFr8jUAvu0Nvg/edit?utm_content=DAGpOH3wUyI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative overflow-hidden rounded-2xl border-2 border-red-600/30 group-hover:border-red-500 transition-all duration-300 transform group-hover:scale-105 shadow-2xl">
                <img 
                  src="/presentacion_portada.png" 
                  alt="Portada de la presentación Streamly" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-red-600 bg-opacity-80 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <Play size={32} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-semibold">Haz clic para ver la presentación completa</p>
                </div>
              </div>
            </a>
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-8 rounded-2xl border border-gray-600 backdrop-blur-sm max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-red-400">Contenido de la Presentación</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <Star className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Análisis del problema y solución propuesta</span>
                </li>
                <li className="flex items-start">
                  <Brain className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Arquitectura del sistema de IA multialgorítmico</span>
                </li>
                <li className="flex items-start">
                  <Play className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Demostración en vivo de las aplicaciones</span>
                </li>
              </ul>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <FileText className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Métricas de rendimiento y resultados</span>
                </li>
                <li className="flex items-start">
                  <Users className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Segmentación de usuarios con clustering</span>
                </li>
                <li className="flex items-start">
                  <Sparkles className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Roadmap y futuras implementaciones</span>
                </li>
              </ul>
            </div>
          </div>
          
          <a
            href="https://www.canva.com/design/DAGpOH3wUyI/TwhERSMNOxFr8jUAvu0Nvg/edit?utm_content=DAGpOH3wUyI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-10 rounded-xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            <ExternalLink size={24} className="inline mr-3" /> 
            Acceder a la Presentación Completa
          </a>
        </div>
      </AnimatedSection>

      {/* Sección de Documentación */}
      <AnimatedSection className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <FileText size={80} className="mx-auto mb-8 text-red-500" style={{ color: logoColor }}/>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span style={{ color: logoColor }}>Documentación</span> Técnica Completa
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Documentación exhaustiva de 44 páginas que detalla toda la investigación, desarrollo 
            y implementación del sistema de recomendación con IA.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-red-600/50 transition-all duration-300">
              <Brain size={40} className="mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-semibold mb-3 text-red-400">Modelos de IA</h3>
              <p className="text-gray-400 text-sm">SVD, TruncatedSVD, Neural Collaborative Filtering y redes neuronales especializadas</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-red-600/50 transition-all duration-300">
              <Search size={40} className="mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-semibold mb-3 text-red-400">PLN Avanzado</h3>
              <p className="text-gray-400 text-sm">Procesamiento de lenguaje natural con FAISS, embeddings y chatbot conversacional</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-red-600/50 transition-all duration-300">
              <FileText size={40} className="mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-semibold mb-3 text-red-400">Metodología CRISP-DM</h3>
              <p className="text-gray-400 text-sm">Análisis completo de datos, segmentación de usuarios y métricas de evaluación</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button
              onClick={() => openDocument('/Streamly-Documentacion.pdf')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Eye size={20} className="mr-2" />
              Ver Documento
            </button>
            <a
              href="/Streamly-Documentacion.pdf"
              download
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Download size={20} className="mr-2" />
              Descargar PDF
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Sección de Tipos de Recomendaciones */}
      <AnimatedSection className="py-20 md:py-32 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Brain size={80} className="mx-auto mb-8 text-red-500" style={{ color: logoColor }}/>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Tipos de <span style={{ color: logoColor }}>Recomendaciones</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nuestro sistema multialgorítmico utiliza diferentes enfoques de IA para ofrecerte 
              recomendaciones precisas y diversificadas según el contexto.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Personalized Recs */}
            <div className="bg-gradient-to-br from-purple-800/30 to-purple-900/30 p-6 rounded-xl border border-purple-600/30 hover:border-purple-500 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <Users size={32} className="text-purple-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Personalized Recs</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Utiliza <strong>NeuralCF</strong>, una red neuronal profunda, para aprender interacciones complejas usuario-película mediante embeddings y capas ocultas.
              </p>
              <p className="text-gray-400 text-xs">
                Predice preferencias basándose en patrones de gusto de usuarios similares y las características implícitas aprendidas por la red.
              </p>
            </div>

            {/* Maybe you will like */}
            <div className="bg-gradient-to-br from-blue-800/30 to-blue-900/30 p-6 rounded-xl border border-blue-600/30 hover:border-blue-500 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <Sparkles size={32} className="text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Maybe You Will Like</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Emplea <strong>NeuralCF</strong> para analizar interacciones históricas, aprendiendo representaciones latentes no lineales de usuarios e ítems.
              </p>
              <p className="text-gray-400 text-xs">
                Identifica patrones de gustos entre usuarios para predecir qué películas podrían agradarle según perfiles con afinidades similares.
              </p>
            </div>

            {/* Recomendación Basada en Contenido */}
            <div className="bg-gradient-to-br from-green-800/30 to-green-900/30 p-6 rounded-xl border border-green-600/30 hover:border-green-500 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <Search size={32} className="text-green-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Basada en Contenido</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Una <strong>red neuronal</strong> analiza exclusivamente el contenido de la película (sinopsis, géneros, actores) y mapea sus características a un espacio vectorial.
              </p>
              <p className="text-gray-400 text-xs">
                Sugiere títulos semánticamente similares cuyas representaciones vectoriales estén cercanas, indicando afinidad de contenido intrínseco.
              </p>
            </div>

            {/* Users like you watched */}
            <div className="bg-gradient-to-br from-orange-800/30 to-orange-900/30 p-6 rounded-xl border border-orange-600/30 hover:border-orange-500 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <Users size={32} className="text-orange-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Users Like You Watched</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Identifica películas populares entre usuarios con gustos similares dentro del mismo clúster, basándose en la sabiduría colectiva.
              </p>
              <p className="text-gray-400 text-xs">
                Se apoya en <strong>TruncatedSVD</strong> para procesar datos y encontrar eficientemente patrones de valoración afines.
              </p>
            </div>

            {/* Recomendador de Géneros */}
            <div className="bg-gradient-to-br from-pink-800/30 to-pink-900/30 p-6 rounded-xl border border-pink-600/30 hover:border-pink-500 transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <Tv size={32} className="text-pink-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Recomendador de Géneros</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Usa <strong>SVD</strong> para descomponer la matriz de interacción usuario-película, extrayendo componentes latentes que relacionan usuarios y géneros.
              </p>
              <p className="text-gray-400 text-xs">
                Recomienda películas al identificar similitudes entre los géneros preferidos del usuario y estas características latentes de las películas.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 p-6 rounded-xl border border-red-600/30 max-w-2xl mx-auto">
              <h4 className="text-lg font-semibold text-red-400 mb-2">Tecnologías de IA Utilizadas</h4>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="bg-gray-700 px-3 py-1 rounded-full text-gray-300">Neural Collaborative Filtering</span>
                <span className="bg-gray-700 px-3 py-1 rounded-full text-gray-300">SVD & TruncatedSVD</span>
                <span className="bg-gray-700 px-3 py-1 rounded-full text-gray-300">Redes Neuronales</span>
                <span className="bg-gray-700 px-3 py-1 rounded-full text-gray-300">Clustering K-Means</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Sección de Repositorios */}
      <AnimatedSection className="py-20 md:py-32 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <Github size={80} className="mx-auto mb-8 text-red-500" style={{ color: logoColor }}/>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Código <span style={{ color: logoColor }}>Abierto</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Transparencia total. Explora nuestro código fuente y descubre 
            cómo hemos construido cada componente del ecosistema Streamly.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                name: "Backend API & IA", 
                desc: "FastAPI con modelos de recomendación, PLN y análisis de datos",
                href: "https://github.com/Miguelstucom/StreamlyBack",
                tech: "Python • FastAPI • Scikit-learn • TensorFlow"
              },
              { 
                name: "App Móvil Flutter", 
                desc: "Aplicación nativa para Android e iOS con JWT",
                href: "https://github.com/Miguelstucom/streamly",
                tech: "Flutter • Dart • REST API • Autenticación JWT"
              },
              { 
                name: "Frontend Web Laravel", 
                desc: "Plataforma web completa con integración de APIs de Python",
                href: "https://github.com/SJRobayo/streamly-web-app.git",
                tech: "Laravel • PHP • Blade • API Integration"
              }
            ].map((repo, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-red-600/50 transition-all duration-300 group transform hover:scale-105">
                <Github size={40} className="mx-auto mb-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                <h3 className="text-xl font-semibold mb-2 text-white">{repo.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{repo.desc}</p>
                <p className="text-xs text-gray-500 mb-4 font-mono">{repo.tech}</p>
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-700 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300 transform hover:scale-105"
                >
                  Ver Repositorio
                </a>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Sección de Contacto */}
      <AnimatedSection id="team-section" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Users size={80} className="mx-auto mb-8 text-red-500" style={{ color: logoColor }}/>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Conoce al <span style={{ color: logoColor }}>Equipo</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tres desarrolladores especializados en diferentes tecnologías, unidos para crear 
              el futuro de las recomendaciones cinematográficas con inteligencia artificial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {developers.map((dev, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-red-600/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group"
              >
                <div className="text-center mb-6">
                  <div className="relative mx-auto w-40 h-40 mb-6">
                    <img
                      src={dev.imageUrl}
                      alt={dev.name}
                      className="w-full h-full rounded-full border-4 border-red-600/50 group-hover:border-red-500 transition-all duration-300 object-cover"
                      onError={(e) => { 
                        e.target.src = `https://placehold.co/200x200/d8372d/FFFFFF?text=${dev.name.substring(0,2).toUpperCase()}`; 
                      }}
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800 animate-pulse"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2" style={{ color: logoColor }}>
                    {dev.name}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium mb-4 px-2 leading-relaxed">
                    {dev.title}
                  </p>
                  {dev.description && (
                    <p className="text-gray-500 text-xs mb-4 italic">
                      {dev.description}
                    </p>
                  )}
                </div>
               
                <div className="space-y-3">
                  <ContactButton
                    icon={Mail}
                    label="Contactar"
                    href={`mailto:${dev.email}`}
                    bgColor="bg-red-600"
                    hoverColor="hover:bg-red-700"
                    dev={dev}
                  />
                  <ContactButton
                    icon={Linkedin}
                    label="LinkedIn"
                    href={dev.linkedin}
                    bgColor="bg-blue-600"
                    hoverColor="hover:bg-blue-700"
                  />
                  <ContactButton
                    icon={Github}
                    label="GitHub"
                    href={dev.github}
                    bgColor="bg-gray-700"
                    hoverColor="hover:bg-gray-600"
                  />
                  {dev.cvUrl && (
                    <>
                      <ContactButton
                        icon={Eye}
                        label="Ver CV"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openDocument(dev.cvUrl);
                        }}
                        bgColor="bg-purple-600"
                        hoverColor="hover:bg-purple-700"
                      />
                      <ContactButton
                        icon={Download}
                        label="Descargar CV"
                        href={dev.cvUrl}
                        bgColor="bg-emerald-600"
                        hoverColor="hover:bg-emerald-700"
                        download={true}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Call to Action Final */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-red-900/20 via-black to-red-900/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            El futuro de las <span style={{ color: logoColor }}>recomendaciones</span> está aquí
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Streamly AI combina algoritmos de vanguardia con experiencia de usuario excepcional. 
            Descubre cómo estamos cambiando la forma de consumir entretenimiento.
          </p>
          <button
            onClick={() => document.getElementById('presentation-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-10 rounded-xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles size={24} className="inline mr-3" />
            Explorar el Proyecto
          </button>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-12 text-center bg-black border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center mb-6">
            <img 
              src="/Streamly-logo.png" 
              alt="Streamly Logo" 
              className="w-8 h-8 mr-3"
            />
            <span className="text-2xl font-bold">
              <span style={{ color: logoColor }}>Stream</span>ly AI
            </span>
          </div>
          
          <p className="text-gray-500 mb-4">
            &copy; {new Date().getFullYear()} Streamly AI. Todos los derechos reservados.
          </p>
          
          <p className="text-sm text-gray-600 mb-6">
            Desarrollado con <span style={{ color: logoColor }} className="animate-pulse">❤</span> por Miguel Ángel Vázquez, Samuel Robayo & Abel Pérez Jiménez.
          </p>
          
          <div className="flex justify-center space-x-8 mb-6">
            <a 
              href="https://github.com/Miguelstucom/StreamlyBack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-400 transition-colors flex items-center"
            >
              <Github size={20} className="mr-2" />
              Backend
            </a>
            <a 
              href="https://github.com/Miguelstucom/streamly" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-400 transition-colors flex items-center"
            >
              <Github size={20} className="mr-2" />
              Mobile
            </a>
            <a 
              href="https://github.com/SJRobayo/streamly-web-app.git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-400 transition-colors flex items-center"
            >
              <Github size={20} className="mr-2" />
              Web
            </a>
          </div>
          
          <div className="flex justify-center space-x-6 text-sm">
            <button 
              onClick={() => openDocument('/Streamly-Documentacion.pdf')}
              className="text-gray-500 hover:text-red-400 transition-colors"
            >
              Documentación Técnica
            </button>
            <a 
              href="https://www.canva.com/design/DAGpOH3wUyI/TwhERSMNOxFr8jUAvu0Nvg/edit?utm_content=DAGpOH3wUyI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-400 transition-colors"
            >
              Presentación Completa
            </a>
            <button
              onClick={() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-500 hover:text-red-400 transition-colors"
            >
              Contacto del Equipo
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;