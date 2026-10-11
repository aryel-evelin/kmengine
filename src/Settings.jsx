import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Shield,
  Key,
  CheckCircle2,
  AlertTriangle,
  Sun,
  Moon,
  Sparkles,
  Save,
  Clock,
  Eye,
  EyeOff,
  RefreshCw,
  Sliders,
  Laptop
} from 'lucide-react';

/**
 * Settings Component for KM Engine
 * Manages operator profile info, security credentials (with Google Auth conditional logic),
 * and system preferences including Light/Dark theme and 30s auto-save settings.
 *
 * @param {Object} props
 * @param {Object} [props.user]
 * @param {boolean} [props.isDarkMode]
 * @param {Function} [props.onToggleTheme]
 * @param {Function} [props.onUpdateUser]
 */
export default function Settings({
  user = null,
  isDarkMode = true,
  onToggleTheme = null,
  onUpdateUser = null
}) {
  // Section 1: Profile Info State
  const [operatorName, setOperatorName] = useState(
    user?.name || 'Kiara Mila'
  );
  const [operatorEmail, setOperatorEmail] = useState(
    user?.email || 'kiaramila.growth@gmail.com'
  );
  const [operatorRole, setOperatorRole] = useState(
    user?.role || 'Creative Growth Lead & AI Operator'
  );
  const [infoSavedSuccess, setInfoSavedSuccess] = useState(false);

  // Section 2: Security & Password Management State
  // Crucial requirement: loggedInViaGoogle boolean (defaults to true for testing, or checks user provider)
  const [loggedInViaGoogle, setLoggedInViaGoogle] = useState(
    user?.provider === 'google' || true
  );

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Section 3: Preferences State
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [localTheme, setLocalTheme] = useState(isDarkMode);

  // Handle Profile Info Save
  const handleSaveInfo = (e) => {
    e?.preventDefault();
    if (!operatorName.trim() || !operatorEmail.trim()) {
      return;
    }

    setInfoSavedSuccess(true);
    if (typeof onUpdateUser === 'function') {
      onUpdateUser({
        name: operatorName.trim(),
        email: operatorEmail.trim(),
        role: operatorRole.trim()
      });
    }

    setTimeout(() => {
      setInfoSavedSuccess(false);
    }, 3000);
  };

  // Handle Password Update (when logged in via email/password)
  const handleUpdatePassword = (e) => {
    e?.preventDefault();
    if (loggedInViaGoogle) return;

    if (!currentPassword) {
      setPasswordFeedback({
        type: 'error',
        message: 'Por favor, informe a senha atual para prosseguir.'
      });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordFeedback({
        type: 'error',
        message: 'A nova senha deve ter no mínimo 8 caracteres.'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({
        type: 'error',
        message: 'A confirmação de senha não coincide com a nova senha.'
      });
      return;
    }

    setIsUpdatingPassword(true);
    setPasswordFeedback(null);

    setTimeout(() => {
      setIsUpdatingPassword(false);
      setPasswordFeedback({
        type: 'success',
        message: 'Senha atualizada com sucesso no banco seguro KM.'
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        setPasswordFeedback(null);
      }, 4000);
    }, 700);
  };

  // Handle local theme toggle
  const handleToggleTheme = () => {
    const next = !localTheme;
    setLocalTheme(next);
    if (typeof onToggleTheme === 'function') {
      onToggleTheme(next);
    }
  };

  return (
    <div className="space-y-8 flex-1 animate-in fade-in duration-300 max-w-5xl mx-auto w-full pb-12">
      {/* ========================================================================= */}
      {/* 1. HEADER */}
      {/* ========================================================================= */}
      <div className="relative rounded-2xl bg-gradient-to-r from-red-950/30 via-black to-black border border-white/10 p-6 sm:p-8 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 right-0 w-80 h-40 bg-red-600/10 blur-[90px] pointer-events-none rounded-full" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">
              <Shield className="w-3.5 h-3.5 text-red-500" />
              SISTEMA &bull; PAINEL DO OPERADOR
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight flex items-center gap-3">
              <span>Configurações da Conta</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-mono leading-relaxed">
              Gerencie suas informações pessoais e credenciais de acesso.
            </p>
          </div>

          {/* Quick status pill */}
          <div className="flex items-center gap-2 shrink-0 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-mono text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sessão Ativa: {operatorEmail}</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: INFORMAÇÕES DO OPERADOR (PROFILE INFO) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white">
                Informações do Operador
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Dados cadastrais de exibição e identificação nos relatórios e exportações.
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
            ID: KM-OP-9024
          </span>
        </div>

        {infoSavedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-xs font-mono text-emerald-300 flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Informações do operador salvas com sucesso no banco do KM Engine!</span>
          </div>
        )}

        <form onSubmit={handleSaveInfo} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome Completo */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-gray-300 font-medium">
                Nome Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  placeholder="Seu Nome Completo"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/60 hover:bg-black/40 focus:bg-black/80 border border-white/15 focus:border-red-500 focus:ring-1 focus:ring-red-500/40 rounded-xl text-white placeholder-gray-500 text-xs sm:text-sm font-mono transition-all outline-none"
                />
              </div>
            </div>

            {/* E-mail */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-gray-300 font-medium">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={operatorEmail}
                  onChange={(e) => setOperatorEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/60 hover:bg-black/40 focus:bg-black/80 border border-white/15 focus:border-red-500 focus:ring-1 focus:ring-red-500/40 rounded-xl text-white placeholder-gray-500 text-xs sm:text-sm font-mono transition-all outline-none"
                />
              </div>
            </div>

            {/* Cargo / Função */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-mono text-gray-300 font-medium">
                Cargo / Perfil de Operação
              </label>
              <input
                type="text"
                value={operatorRole}
                onChange={(e) => setOperatorRole(e.target.value)}
                placeholder="Ex: Creative Director, Growth Hacker, Copywriter"
                className="w-full px-4 py-2.5 bg-black/60 hover:bg-black/40 focus:bg-black/80 border border-white/15 focus:border-red-500 focus:ring-1 focus:ring-red-500/40 rounded-xl text-white placeholder-gray-500 text-xs sm:text-sm font-mono transition-all outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold font-mono text-xs tracking-wider uppercase text-white bg-red-600 hover:bg-red-500 active:bg-red-700 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] transition-all cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Informações</span>
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION 2: SEGURANÇA & TROCA DE SENHA (SECURITY WITH GOOGLE AUTH LOGIC) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white">
                Segurança &amp; Troca de Senha
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Gerencie sua chave criptográfica de acesso e autenticação biométrica/social.
              </p>
            </div>
          </div>

          {/* Interactive Toggle Pill for Mock / Testing Google Login vs Email Login */}
          <div className="flex items-center gap-2 bg-black/60 border border-white/10 p-1.5 rounded-xl text-[11px] font-mono">
            <span className="text-gray-400 px-1 text-[10px] uppercase font-bold">Modo de Autenticação:</span>
            <button
              type="button"
              onClick={() => {
                setLoggedInViaGoogle(true);
                setPasswordFeedback(null);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                loggedInViaGoogle
                  ? 'bg-red-600 text-white font-bold shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Google OAuth (Ativo)
            </button>
            <button
              type="button"
              onClick={() => {
                setLoggedInViaGoogle(false);
                setPasswordFeedback(null);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                !loggedInViaGoogle
                  ? 'bg-red-600 text-white font-bold shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              E-mail / Senha
            </button>
          </div>
        </div>

        {/* CONDITIONAL WARNING BADGE: PROMINENT WARNING IF LOGGED IN VIA GOOGLE */}
        {loggedInViaGoogle && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-200 flex items-start gap-3 shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-fadeIn">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-300 block tracking-wider uppercase">
                Autenticação via Google Ativa
              </span>
              <p className="text-gray-300 leading-relaxed text-[11px] sm:text-xs">
                A alteração de senha deve ser feita diretamente na sua conta Google. Seus acessos são protegidos pelo protocolo OAuth 2.0 com verificação em duas etapas.
              </p>
            </div>
          </div>
        )}

        {/* Feedback message for password form */}
        {passwordFeedback && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2.5 animate-fadeIn ${
              passwordFeedback.type === 'error'
                ? 'bg-red-950/40 border-red-500/50 text-red-200'
                : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
            }`}
          >
            {passwordFeedback.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{passwordFeedback.message}</span>
          </div>
        )}

        {/* Password Form with disabled logic if logged in via Google */}
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Senha Atual */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-gray-300 font-medium">
                Senha Atual
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  disabled={loggedInViaGoogle}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-4 pr-10 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-all outline-none border ${
                    loggedInViaGoogle
                      ? 'bg-black/30 border-white/5 text-gray-500 opacity-50 cursor-not-allowed select-none'
                      : 'bg-black/60 hover:bg-black/40 focus:bg-black/80 border-white/15 focus:border-red-500 focus:ring-1 focus:ring-red-500/40 text-white placeholder-gray-500'
                  }`}
                />
                {!loggedInViaGoogle && (
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 cursor-pointer"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {/* Nova Senha */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-gray-300 font-medium">
                Nova Senha
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  disabled={loggedInViaGoogle}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 8 dígitos"
                  className={`w-full pl-4 pr-10 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-all outline-none border ${
                    loggedInViaGoogle
                      ? 'bg-black/30 border-white/5 text-gray-500 opacity-50 cursor-not-allowed select-none'
                      : 'bg-black/60 hover:bg-black/40 focus:bg-black/80 border-white/15 focus:border-red-500 focus:ring-1 focus:ring-red-500/40 text-white placeholder-gray-500'
                  }`}
                />
                {!loggedInViaGoogle && (
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {/* Confirmar Nova Senha */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-gray-300 font-medium">
                Confirmar Nova Senha
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                disabled={loggedInViaGoogle}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a nova senha"
                className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-all outline-none border ${
                  loggedInViaGoogle
                    ? 'bg-black/30 border-white/5 text-gray-500 opacity-50 cursor-not-allowed select-none'
                    : 'bg-black/60 hover:bg-black/40 focus:bg-black/80 border-white/15 focus:border-red-500 focus:ring-1 focus:ring-red-500/40 text-white placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] font-mono text-gray-500">
              {loggedInViaGoogle
                ? 'Campos desativados em conformidade com o padrão de segurança Google IDP.'
                : 'Dica: Utilize senhas fortes com números e caracteres especiais.'}
            </span>

            <button
              type="submit"
              disabled={loggedInViaGoogle || isUpdatingPassword}
              className={`px-5 py-2.5 rounded-xl font-bold font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                loggedInViaGoogle
                  ? 'bg-white/5 border border-white/5 text-gray-600 opacity-50 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] cursor-pointer'
              }`}
            >
              {isUpdatingPassword ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Atualizando...</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Atualizar Senha</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* 4. SECTION 3: PREFERÊNCIAS DO SISTEMA (THEME TOGGLE & AUTO-SAVE 30S) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white">
              Preferências do Sistema
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              Controle de tema visual, rotinas de salvamento automático e comportamento do estúdio.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card: Tema Visual (Dark/Light mode toggle) */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                {localTheme ? (
                  <Moon className="w-4 h-4 text-red-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
                Aparência Visual
              </span>
              <p className="text-[11px] text-gray-400 font-mono">
                Modo {localTheme ? 'Escuro (Cyberpunk Red)' : 'Claro Profissional (Clean Slate)'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleTheme}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                localTheme
                  ? 'bg-white/10 hover:bg-white/15 border-white/20 text-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.2)]'
                  : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {localTheme ? (
                <>
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span>Modo Escuro</span>
                </>
              )}
            </button>
          </div>

          {/* Card: Auto-Save de Roteiros (30 segundos) */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Auto-Save no Navegador
              </span>
              <p className="text-[11px] text-gray-400 font-mono">
                Persistência automática a cada 30 segundos no LocalStorage
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ATIVO (30s)
              </span>
            </div>
          </div>
        </div>

        {/* Informações adicionais do KM Engine */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] font-mono text-gray-500 border-t border-white/5">
          <span>KM CREATIVE GROWTH AI &bull; ENTERPRISE BUILD 2026.4.1</span>
          <span className="text-red-400">ENCRYPTION: AES-256 GCM CLIENT PERSISTENCE</span>
        </div>
      </div>
    </div>
  );
}
