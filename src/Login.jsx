import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Sun,
  Moon
} from 'lucide-react';

/**
 * Google Icon SVG component with authentic brand colors
 */
function GoogleIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

/**
 * Standalone Full-Screen Login Component
 * Supports:
 * - Default Dark Tech Cyberpunk Neon Red aesthetic
 * - Clean, professional Light Mode with top-right Sun/Moon toggle button
 * - Form validation and simulated authentication
 * - Google authentication flow
 * @param {{ onLoginSuccess?: (userData: any) => void }} props
 */
export default function Login({ onLoginSuccess }) {
  // Theme State Management (defaults to dark mode)
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

  // Toggle theme handler
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Email/password submission
  const handleLogin = (e) => {
    if (e) e.preventDefault();

    if (!email.trim()) {
      setFeedbackMessage({
        type: 'error',
        text: 'Por favor, insira o seu e-mail de acesso.'
      });
      return;
    }

    if (!password) {
      setFeedbackMessage({
        type: 'error',
        text: 'Por favor, informe a sua senha.'
      });
      return;
    }

    setIsLoading(true);
    setFeedbackMessage(null);

    // Simulate authentication pipeline
    setTimeout(() => {
      setIsLoading(false);
      const userPayload = {
        email: email.trim(),
        name: email.split('@')[0] || 'Operador KM',
        avatar: null,
        provider: 'email',
        role: 'Creative Director',
        tier: 'Enterprise AI Suite'
      };

      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(userPayload);
      }
    }, 650);
  };

  // Google OAuth simulation
  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setFeedbackMessage(null);

    setTimeout(() => {
      setIsGoogleLoading(false);
      const googleUserPayload = {
        email: 'kiaramila.growth@gmail.com',
        name: 'Kiara Mila',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        provider: 'google',
        role: 'Verified Growth Lead',
        tier: 'Enterprise AI Suite'
      };

      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(googleUserPayload);
      }
    }, 600);
  };

  // Demo auto-fill helper
  const handleDemoFill = () => {
    setEmail('operador@kmgrowth.ai');
    setPassword('neural-engine-2026');
    setFeedbackMessage({
      type: 'info',
      text: 'Credenciais preenchidas. Clique em "Acessar" para entrar.'
    });
  };

  // Forgot password handler
  const handleForgotPassword = () => {
    setForgotPasswordNotice(true);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none transition-colors duration-300 ${
        isDarkMode ? 'bg-black text-white' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* TOP-RIGHT THEME TOGGLE BUTTON */}
      <div className="absolute top-6 right-6 z-30">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
          title={isDarkMode ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
          className={`p-2.5 sm:p-3 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center group shadow-md ${
            isDarkMode
              ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-yellow-400/50 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
              : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-700 hover:text-slate-900 shadow-sm hover:shadow'
          }`}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
          )}
        </button>
      </div>

      {/* Background Ambience: Subtle Radial Depth */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle 500px at 50% 50%, rgba(239, 68, 68, 0.12) 0%, rgba(10, 10, 10, 0.8) 50%, #000000 100%)'
            : 'radial-gradient(circle 600px at 50% 50%, rgba(239, 68, 68, 0.08) 0%, rgba(241, 245, 249, 0.6) 50%, #f1f5f9 100%)'
        }}
      />

      {/* Cyber / Tech Grid Substrate Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isDarkMode ? 0.035 : 0.025,
          backgroundImage: `
            linear-gradient(to right, ${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Subtle Scanline / Radial Beam Effect */}
      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.06),transparent_70%)]" />
      )}

      {/* Main Login Card */}
      <div
        className={`relative w-full max-w-[420px] rounded-2xl p-7 sm:p-9 z-10 transition-all duration-300 backdrop-blur-2xl ${
          isDarkMode
            ? 'bg-[#0a0a0a] border-2 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.6)] sm:shadow-[0_0_55px_rgba(239,68,68,0.65)]'
            : 'bg-white border-2 border-red-500/70 shadow-[0_15px_45px_rgba(239,68,68,0.18),0_2px_8px_rgba(0,0,0,0.05)]'
        }`}
      >
        {/* Top Glowing Red Accent Bar */}
        <div
          className={`absolute -top-[2px] left-1/2 -translate-x-1/2 w-32 h-[3px] rounded-full transition-all ${
            isDarkMode ? 'bg-red-400 shadow-[0_0_12px_#ef4444]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
          }`}
        />

        {/* LOGO AREA */}
        <div className="text-center pt-1 pb-7 sm:pb-8">
          <div className="inline-block relative">
            <h1
              className={`text-5xl sm:text-6xl font-black font-mono tracking-tighter uppercase transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
              style={{
                textShadow: isDarkMode
                  ? '0 0 10px #ef4444, 0 0 25px rgba(239, 68, 68, 0.85), 0 0 45px rgba(239, 68, 68, 0.5)'
                  : '0 0 8px rgba(239, 68, 68, 0.35), 0 0 20px rgba(239, 68, 68, 0.15)'
              }}
            >
              KM
            </h1>
            {/* Tech dot */}
            <span className="absolute top-1 -right-3 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
          </div>

          <p
            className={`text-xs sm:text-sm font-mono tracking-[0.22em] uppercase mt-2 font-medium transition-colors ${
              isDarkMode ? 'text-white/90' : 'text-slate-600'
            }`}
          >
            AI Growth Engine
          </p>

          <div
            className={`mt-2.5 flex items-center justify-center gap-2 text-[10px] font-mono transition-colors ${
              isDarkMode ? 'text-gray-500' : 'text-slate-500'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="tracking-wider uppercase">Ambiente Seguro &bull; VSL 9:16</span>
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {feedbackMessage && (
          <div
            className={`mb-5 p-3 rounded-xl border text-xs font-mono flex items-start gap-2.5 animate-fadeIn ${
              feedbackMessage.type === 'error'
                ? isDarkMode
                  ? 'bg-red-950/40 border-red-500/50 text-red-200'
                  : 'bg-red-50 border-red-200 text-red-700'
                : isDarkMode
                ? 'bg-white/5 border-white/10 text-gray-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 leading-snug">{feedbackMessage.text}</div>
          </div>
        )}

        {/* FORGOT PASSWORD MODAL / NOTICE */}
        {forgotPasswordNotice && (
          <div
            className={`mb-5 p-3.5 rounded-xl border text-xs font-mono space-y-2 animate-fadeIn ${
              isDarkMode
                ? 'bg-red-950/30 border-red-500/30 text-gray-300'
                : 'bg-red-50/70 border-red-200 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-red-600 font-bold">
              <span>RECUPERAÇÃO DE SENHA</span>
              <button
                type="button"
                onClick={() => setForgotPasswordNotice(false)}
                className={`text-xs px-1 ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                &times;
              </button>
            </div>
            <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Insira o e-mail cadastrado e enviaremos um link seguro para redefinir suas credenciais de acesso ao KM Engine.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-mono outline-none border transition-colors ${
                  isDarkMode
                    ? 'bg-black/60 border-white/20 text-white placeholder-gray-600 focus:border-red-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-red-500'
                }`}
              />
              <button
                type="button"
                onClick={() => {
                  setFeedbackMessage({
                    type: 'info',
                    text: `E-mail de recuperação despachado para: ${email || 'seu e-mail'}`
                  });
                  setForgotPasswordNotice(false);
                }}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(239,68,68,0.5)] cursor-pointer"
              >
                Enviar
              </button>
            </div>
          </div>
        )}

        {/* AUTH FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Campo E-mail */}
          <div className="space-y-1.5">
            <label
              className={`block text-xs font-mono font-medium transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-slate-700'
              }`}
            >
              E-mail
            </label>
            <div className="relative group">
              <div
                className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                  isDarkMode ? 'text-gray-500 group-focus-within:text-red-400' : 'text-slate-400 group-focus-within:text-red-500'
                }`}
              >
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoComplete="email"
                className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-mono transition-all outline-none border ${
                  isDarkMode
                    ? 'bg-white/5 hover:bg-white/[0.04] focus:bg-white/[0.06] border-white/20 focus:border-red-500 focus:ring-1 focus:ring-red-500/50 text-white placeholder-gray-500'
                    : 'bg-slate-50 hover:bg-slate-100/70 focus:bg-white border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div className="space-y-1.5">
            <label
              className={`block text-xs font-mono font-medium transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-slate-700'
              }`}
            >
              Senha
            </label>
            <div className="relative group">
              <div
                className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                  isDarkMode ? 'text-gray-500 group-focus-within:text-red-400' : 'text-slate-400 group-focus-within:text-red-500'
                }`}
              >
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm font-mono transition-all outline-none border ${
                  isDarkMode
                    ? 'bg-white/5 hover:bg-white/[0.04] focus:bg-white/[0.06] border-white/20 focus:border-red-500 focus:ring-1 focus:ring-red-500/50 text-white placeholder-gray-500'
                    : 'bg-slate-50 hover:bg-slate-100/70 focus:bg-white border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors cursor-pointer ${
                  isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-slate-400 hover:text-slate-700'
                }`}
                title={showPassword ? 'Ocultar senha' : 'Ver senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Link Esqueceu a Senha */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleForgotPassword}
                className={`text-xs font-mono transition-colors cursor-pointer focus:outline-none ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-white hover:text-red-400'
                    : 'text-slate-500 hover:text-red-600'
                }`}
              >
                Esqueceu a senha?
              </button>
            </div>
          </div>

          {/* Botão Primário: Acessar */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl font-bold font-mono text-sm tracking-wider uppercase text-white bg-red-600 hover:bg-red-500 active:bg-red-700 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <span>Acessar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* DIVISOR SLEEK HORIZONTAL */}
        <div className="relative my-6 flex items-center">
          <div className={`flex-grow border-t transition-colors ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`} />
          <span
            className={`shrink-0 mx-4 text-xs font-mono font-semibold uppercase transition-colors ${
              isDarkMode ? 'text-gray-500' : 'text-slate-400'
            }`}
          >
            OU
          </span>
          <div className={`flex-grow border-t transition-colors ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`} />
        </div>

        {/* GOOGLE LOGIN BUTTON */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-70 border ${
              isDarkMode
                ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 active:bg-white/[0.15] text-white shadow-sm'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 active:bg-slate-100 text-slate-700 shadow-sm'
            }`}
          >
            {isGoogleLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-400 border-t-red-500 rounded-full animate-spin" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Conectando ao Google...</span>
              </>
            ) : (
              <>
                <GoogleIcon className="w-4 h-4 shrink-0" />
                <span className={isDarkMode ? 'text-gray-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}>
                  Entrar com o Google
                </span>
              </>
            )}
          </button>
        </div>

        {/* QUICK DEMO ACCESS BAR */}
        <div
          className={`mt-6 pt-5 border-t flex items-center justify-between text-[11px] font-mono transition-colors ${
            isDarkMode ? 'border-white/10 text-gray-500' : 'border-slate-200 text-slate-500'
          }`}
        >
          <button
            type="button"
            onClick={handleDemoFill}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-slate-600 hover:text-red-600'
            }`}
            title="Preencher com credenciais de teste"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Preenchimento Rápido</span>
          </button>

          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className={isDarkMode ? 'text-gray-500' : 'text-slate-500'}>KM Security v2.5</span>
          </span>
        </div>
      </div>

      {/* FOOTER COPYRIGHT */}
      <div
        className={`relative z-10 mt-8 text-center text-[10px] font-mono transition-colors ${
          isDarkMode ? 'text-gray-600' : 'text-slate-500'
        }`}
      >
        KM | CREATIVE GROWTH AI &copy; 2026 &bull; VIRAL TONE DECODING & INSTAGRAM REELS ENGINE
      </div>
    </div>
  );
}
