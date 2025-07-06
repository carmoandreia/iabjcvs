import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, ShieldCheck } from "@/src/icons";

const promptsByChecklist = {
  SPIRIT: {
    pergunta: "Qual é o objetivo principal do protocolo de estudo clínico?",
    introducao: "Forneça o contexto e justificativa para condução do estudo clínico.",
    metodos: "Descreva o desenho do estudo, intervenções, cronograma e participantes.",
    resultados: "Quais desfechos serão medidos e como serão avaliados?",
    discussao: "Discorra sobre os riscos esperados, plano de disseminação e implicações do estudo.",
    tituloResumo: "Crie um título e resumo estruturado conforme SPIRIT para protocolo de estudo."
  },
  "PRISMA P": {
    pergunta: "Formule a pergunta central da revisão sistemática planejada.",
    introducao: "Apresente a justificativa para a realização da revisão sistemática.",
    metodos: "Descreva os critérios de elegibilidade, estratégia de busca e plano de análise.",
    resultados: "Especifique os desfechos primários e secundários que serão avaliados.",
    discussao: "Aborde as limitações esperadas e contribuições potenciais da revisão.",
    tituloResumo: "Crie um título e resumo conforme PRISMA P para protocolo de revisão sistemática."
  }
};

export default function IAEditorSite() {
  const [checklist, setChecklist] = useState("SPIRIT");
  const [secao, setSecao] = useState("pergunta");
  const [promptEditado, setPromptEditado] = useState(promptsByChecklist[checklist]?.[secao] || "");

  const atualizarPrompt = (novoChecklist, novaSecao) => {
    const novoPrompt = promptsByChecklist[novoChecklist]?.[novaSecao] || "";
    setPromptEditado(novoPrompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promptEditado);
    alert("Prompt copiado para a área de transferência!");
  };

  const handleAbrirChatGPT = () => {
    const url = `https://chat.openai.com/?prompt=${encodeURIComponent(promptEditado)}`;
    window.open(url, "_blank");
  };

  const handleAbrirPerplexity = () => {
    const url = `https://www.perplexity.ai/search?q=${encodeURIComponent(promptEditado)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{
      padding: "2rem",
      fontFamily: "'Inter', sans-serif",
      background: "linear-gradient(135deg, #f0f4f8, #ffffff)",
      color: "#1c1c1c",
      minHeight: "100vh"
    }}>
      <h1 style={{ marginBottom: '1.5rem' }}>🧠 Gerador de Prompts Científicos</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label>
            <strong>Tipo de Estudo (Checklist EQUATOR):</strong><br />
            <select
              value={checklist}
              onChange={e => {
                const novoChecklist = e.target.value;
                setChecklist(novoChecklist);
                atualizarPrompt(novoChecklist, secao);
              }}
              style={{ width: '100%', padding: '0.5rem' }}>
              {Object.keys(promptsByChecklist).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label>
            <strong>Seção do Artigo:</strong><br />
            <select
              value={secao}
              onChange={e => {
                const novaSecao = e.target.value;
                setSecao(novaSecao);
                atualizarPrompt(checklist, novaSecao);
              }}
              style={{ width: '100%', padding: '0.5rem' }}>
              {Object.keys(promptsByChecklist[checklist]).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <Card>
        <CardContent>
          <Textarea
            value={promptEditado}
            onChange={e => setPromptEditado(e.target.value)}
            rows={6}
          />
          <div style={{
            marginTop: "1rem",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "stretch",
            width: "100%"
          }}>
            <Button onClick={handleCopy}>
              <Copy /> Copiar Prompt
            </Button>
            <Button onClick={handleAbrirChatGPT} variant="outline">
              <Sparkles /> Testar no ChatGPT
            </Button>
            <Button onClick={handleAbrirPerplexity} variant="outline">
              <ShieldCheck /> Testar no Perplexity
            </Button>
            <Button
              onClick={() => {
                const seguro = promptEditado
                  .replace(/(definitivamente|comprovado|sem dúvida)/gi, "")
                  .replace(/referências científicas/gi, "evidências disponíveis");
                setPromptEditado(seguro);
                alert("Modo Seguro ativado: linguagem suavizada para reduzir alucinação.");
              }}
              variant="secondary"
            >
              <ShieldCheck /> Ativar Modo Seguro
            </Button>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#444' }}>
            <strong>💡 Dicas para reduzir alucinação de IA:</strong>
            <ul>
              <li>Use linguagem objetiva e específica nos prompts.</li>
              <li>Evite pedir referências bibliográficas a menos que use IA conectada a bases reais.</li>
              <li>Prefira prompts que peçam síntese de ideias ou sugestões, em vez de respostas factuais absolutas.</li>
              <li>Valide sempre com base em fontes confiáveis como PubMed, Scopus, Guidelines.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <footer style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #ccc', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
        Desenvolvido para a <a href="https://bjcvs.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0077cc', textDecoration: 'none' }}>Brazilian Journal of Cardiovascular Surgery</a> · © 2025
      </footer>
    </div>
  );
}
