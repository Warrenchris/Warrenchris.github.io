import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  Server, 
  Cpu, 
  Database, 
  Network, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

interface SimulationStep {
  stepIndex: number;
  nodeId: string;
  title: string;
  action: string;
  log: string;
  tech: string;
  durationMs: number;
}

export const ArchitecturePlayground: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM_INIT] ISP Billing AAA Architecture Engine Ready.",
    "[RAD_SERVER] FreeRADIUS 3.x daemon listening on UDP 1812/1813/3799.",
    "[QUEUE_WORKER] BullMQ Worker pool connected to Redis cluster."
  ]);

  const steps: SimulationStep[] = [
    {
      stepIndex: 1,
      nodeId: 'client-mpesa',
      title: '1. Inbound Payment Webhook',
      action: 'M-Pesa Daraja sends C2B callback payload to Express endpoint',
      log: 'POST /api/v1/payments/callback -> HTTP 200 (Accepted in 28ms). TransID: QHK8941LA, Ref: ACC-7049, Amount: KES 2,500',
      tech: 'Express.js / Crypto Signature',
      durationMs: 900
    },
    {
      stepIndex: 2,
      nodeId: 'redis-lock',
      title: '2. Distributed Idempotency Lock',
      action: 'Redis acquires NX lock on transaction ID to prevent duplicate callbacks',
      log: 'SET lock:tx:QHK8941LA 1 NX EX 60 -> OK (Lock acquired). No duplicate transaction found.',
      tech: 'Redis (In-Memory)',
      durationMs: 700
    },
    {
      stepIndex: 3,
      nodeId: 'bullmq-queue',
      title: '3. BullMQ Job Enqueued',
      action: 'Dispatches asynchronous renewal job with retry backoff policy',
      log: 'BullMQ: Added job "renew-subscriber" [ID: #job_9842] to priority queue "subscriber-lifecycle"',
      tech: 'BullMQ / Redis Cluster',
      durationMs: 800
    },
    {
      stepIndex: 4,
      nodeId: 'mysql-db',
      title: '4. Atomic DB Transaction',
      action: 'Updates subscriber account expiry & creates immutable invoice ledger',
      log: 'MySQL: BEGIN TX -> UPDATE subscribers SET status="ACTIVE", expiry_date=NOW()+INTERVAL 30 DAY WHERE acc="ACC-7049" -> INSERT INTO ledger -> COMMIT (12ms)',
      tech: 'MySQL 8 (InnoDB Engine)',
      durationMs: 850
    },
    {
      stepIndex: 5,
      nodeId: 'freeradius',
      title: '5. FreeRADIUS Dictionary Update',
      action: 'Refreshes radcheck & radgroupreply bandwidth attributes',
      log: 'RADIUS: Upserted attributes for user "ACC-7049": Mikrotik-Rate-Limit="50M/50M", Auth-Type:="Accept"',
      tech: 'FreeRADIUS 3.x AAA Daemon',
      durationMs: 750
    },
    {
      stepIndex: 6,
      nodeId: 'mikrotik-nas',
      title: '6. Network Access Server (NAS) CoA',
      action: 'Sends RFC 3576 Change-of-Authorization packet to unthrottle PPPoE session',
      log: 'RADIUS CoA -> Dispatched PoD (Packet of Disconnect/Reauth) to MikroTik CCR1036 (192.168.10.1:3799) -> NAS responded CoA-ACK! Session live at 50Mbps.',
      tech: 'MikroTik RouterOS / UDP CoA',
      durationMs: 900
    }
  ];

  const handleStartSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(1);
    addLog(`>>> [SIMULATION START] Customer initiated M-Pesa payment for ACC-7049`);
  };

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 15)]);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (currentStep > 0 && currentStep <= steps.length) {
      const stepData = steps[currentStep - 1];
      addLog(stepData.log);

      const timer = setTimeout(() => {
        if (currentStep < steps.length) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setIsRunning(false);
          addLog(">>> [SIMULATION COMPLETE] Subscriber ACC-7049 active with unthrottled 50Mbps bandwidth.");
        }
      }, stepData.durationMs);

      return () => clearTimeout(timer);
    }
  }, [isRunning, currentStep]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setLogs([
      "[SYSTEM_RESET] Architecture engine reset to idle baseline state.",
      "[RAD_SERVER] FreeRADIUS 3.x daemon listening on UDP 1812/1813/3799.",
      "[QUEUE_WORKER] BullMQ Worker pool connected to Redis cluster."
    ]);
  };

  return (
    <section 
      id="architecture" 
      className="py-20 bg-[#070707] border-y border-white/5 relative overflow-hidden"
      aria-label="Interactive Architecture Visualizer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono-code uppercase tracking-widest text-white/60 mb-3">
              <Activity className="w-3.5 h-3.5 text-white/50" />
              <span>LIVE SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Interactive Data Flow & Lifecycle Engine
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-2 font-normal">
              Visualizing the end-to-end event pipeline in Warren&apos;s Flagship ISP Billing & AAA Subscriber Management System.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleStartSimulation}
              disabled={isRunning}
              id="arch-start-sim-btn"
              className={`px-4 py-2.5 rounded-lg font-mono-code text-xs font-medium flex items-center gap-2 transition-all ${
                isRunning 
                  ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                  : 'bg-white hover:bg-white/90 text-black shadow-sm'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Processing Stream...' : 'Simulate Payment Lifecycle'}</span>
            </button>

            <button
              onClick={handleReset}
              id="arch-reset-sim-btn"
              className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] text-white/70 transition-colors"
              title="Reset Simulation"
              aria-label="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* The Visual Architecture Nodes Pipeline */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-8"
        >
          
          {/* Node 1 */}
          <div className={`p-4 rounded-xl border transition-all duration-300 relative ${
            currentStep === 1 
              ? 'bg-white/[0.08] border-white text-white shadow-xl ring-1 ring-white/30' 
              : currentStep > 1 
                ? 'bg-[#0d0d0d] border-white/20 text-white/90' 
                : 'bg-[#0d0d0d] border-white/5 text-white/40'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-code font-bold text-white/40">STAGE 01</span>
              {currentStep > 1 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-white/70" />
              ) : currentStep === 1 ? (
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              ) : null}
            </div>
            <div className="text-xs font-semibold text-white mb-1">M-Pesa Webhook</div>
            <div className="text-[11px] font-mono-code text-white/70">Express API Gateway</div>
            <div className="text-[10px] text-white/40 mt-2">Signature & payload verification in &lt;30ms</div>
          </div>

          {/* Node 2 */}
          <div className={`p-4 rounded-xl border transition-all duration-300 relative ${
            currentStep === 2 
              ? 'bg-white/[0.08] border-white text-white shadow-xl ring-1 ring-white/30' 
              : currentStep > 2 
                ? 'bg-[#0d0d0d] border-white/20 text-white/90' 
                : 'bg-[#0d0d0d] border-white/5 text-white/40'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-code font-bold text-white/40">STAGE 02</span>
              {currentStep > 2 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-white/70" />
              ) : currentStep === 2 ? (
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              ) : null}
            </div>
            <div className="text-xs font-semibold text-white mb-1">Redis Lock</div>
            <div className="text-[11px] font-mono-code text-white/70">Idempotency Guard</div>
            <div className="text-[10px] text-white/40 mt-2">Atomic `SET NX` locks prevent duplicate renewal</div>
          </div>

          {/* Node 3 */}
          <div className={`p-4 rounded-xl border transition-all duration-300 relative ${
            currentStep === 3 
              ? 'bg-white/[0.08] border-white text-white shadow-xl ring-1 ring-white/30' 
              : currentStep > 3 
                ? 'bg-[#0d0d0d] border-white/20 text-white/90' 
                : 'bg-[#0d0d0d] border-white/5 text-white/40'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-code font-bold text-white/40">STAGE 03</span>
              {currentStep > 3 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-white/70" />
              ) : currentStep === 3 ? (
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              ) : null}
            </div>
            <div className="text-xs font-semibold text-white mb-1">BullMQ Worker</div>
            <div className="text-[11px] font-mono-code text-white/70">Async Queue Job</div>
            <div className="text-[10px] text-white/40 mt-2">Decoupled execution with exponential backoff</div>
          </div>

          {/* Node 4 */}
          <div className={`p-4 rounded-xl border transition-all duration-300 relative ${
            currentStep === 4 
              ? 'bg-white/[0.08] border-white text-white shadow-xl ring-1 ring-white/30' 
              : currentStep > 4 
                ? 'bg-[#0d0d0d] border-white/20 text-white/90' 
                : 'bg-[#0d0d0d] border-white/5 text-white/40'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-code font-bold text-white/40">STAGE 04</span>
              {currentStep > 4 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-white/70" />
              ) : currentStep === 4 ? (
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              ) : null}
            </div>
            <div className="text-xs font-semibold text-white mb-1">MySQL Master</div>
            <div className="text-[11px] font-mono-code text-white/70">ACID Account Ledger</div>
            <div className="text-[10px] text-white/40 mt-2">Updates expiry + writes audit invoice record</div>
          </div>

          {/* Node 5 */}
          <div className={`p-4 rounded-xl border transition-all duration-300 relative ${
            currentStep === 5 
              ? 'bg-white/[0.08] border-white text-white shadow-xl ring-1 ring-white/30' 
              : currentStep > 5 
                ? 'bg-[#0d0d0d] border-white/20 text-white/90' 
                : 'bg-[#0d0d0d] border-white/5 text-white/40'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-code font-bold text-white/40">STAGE 05</span>
              {currentStep > 5 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-white/70" />
              ) : currentStep === 5 ? (
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              ) : null}
            </div>
            <div className="text-xs font-semibold text-white mb-1">FreeRADIUS 3.x</div>
            <div className="text-[11px] font-mono-code text-white/70">radcheck / radreply</div>
            <div className="text-[10px] text-white/40 mt-2">Dynamic speed profile rate attribute sync</div>
          </div>

          {/* Node 6 */}
          <div className={`p-4 rounded-xl border transition-all duration-300 relative ${
            currentStep === 6 
              ? 'bg-white/[0.08] border-white text-white shadow-xl ring-1 ring-white/30' 
              : currentStep > 6 
                ? 'bg-[#0d0d0d] border-white/20 text-white/90' 
                : 'bg-[#0d0d0d] border-white/5 text-white/40'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-code font-bold text-white/40">STAGE 06</span>
              {currentStep >= 6 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-white/70" />
              ) : null}
            </div>
            <div className="text-xs font-semibold text-white mb-1">MikroTik Router</div>
            <div className="text-[11px] font-mono-code text-white/70">UDP 3799 CoA Packet</div>
            <div className="text-[10px] text-white/40 mt-2">Real-time session unthrottle to 50Mbps</div>
          </div>

        </motion.div>

        {/* Live Terminal Telemetry Output */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="bg-[#050505] border border-white/10 rounded-2xl p-4 sm:p-5 font-mono-code shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
              </div>
              <span className="text-white/60 font-semibold ml-2 uppercase text-[11px] tracking-wider">SYSTEM TELEMETRY STREAM</span>
            </div>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">
              {isRunning ? '● STREAM ACTIVE' : '○ IDLE POOL'}
            </span>
          </div>

          <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-2">
            {logs.map((log, index) => (
              <div 
                key={index} 
                className={`leading-relaxed ${
                  log.startsWith('>>>')
                    ? 'text-white font-semibold'
                    : log.includes('ERROR')
                      ? 'text-rose-400'
                      : log.includes('COMMIT') || log.includes('CoA-ACK')
                        ? 'text-emerald-400/90'
                        : 'text-white/50'
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
