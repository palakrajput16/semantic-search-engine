import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function getScoreLabel(score) {
  if (score >= 0.9) return "Excellent";
  if (score >= 0.75) return "Strong";
  if (score >= 0.6) return "Good";
  return "Fair";
}

function getScoreColors(score) {
  if (score >= 0.85) return { bar: "bg-foreground", text: "text-foreground", badge: "bg-foreground/8 border-foreground/20" };
  if (score >= 0.7) return { bar: "bg-muted-foreground", text: "text-muted-foreground", badge: "bg-muted border-border" };
  if (score >= 0.55) return { bar: "bg-muted-foreground/60", text: "text-muted-foreground/80", badge: "bg-muted border-border" };
  return { bar: "bg-muted-foreground/30", text: "text-muted-foreground/60", badge: "bg-muted border-border" };
}

// Note: no page number, fileName, or "Open PDF" here — /search doesn't return
// those fields yet. Add them back once the backend does.
function ResultCard({ result, index }) {
  const [expanded, setExpanded] = useState(false);
  const score = result.similarity;
  const colors = getScoreColors(score);
  const snippetShort =
    result.text.slice(0, 220) + (result.text.length > 220 ? "…" : "");

  return (
    <article className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/25 hover:shadow-sm transition-all duration-200">
      <div className="px-5 pt-4 pb-4">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                #{index + 1}
              </span>
              <h3
                className="text-base font-medium text-card-foreground leading-snug truncate"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {result.title}
              </h3>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-mono border rounded-full px-2 py-0.5 ${colors.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${colors.bar}`} />
              <span className={colors.text}>{Math.round(score * 100)}%</span>
              <span className="text-muted-foreground/70">·</span>
              <span className="text-muted-foreground">{getScoreLabel(score)}</span>
            </span>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-1.5 pt-0.5">
            <span className={`text-sm font-mono font-medium ${colors.text}`}>
              {score.toFixed(2)}
            </span>
            <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                style={{ width: `${score * 100}%` }}
              />
            </div>
          </div>
        </div>

        <p
          className="mt-3 text-sm text-muted-foreground leading-relaxed"
          style={{ fontFamily: "var(--font-serif)", fontSize: "0.875rem", lineHeight: "1.7" }}
        >
          {expanded ? result.text : snippetShort}
        </p>
        {result.text.length > 220 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp size={11} />
                Show less
              </>
            ) : (
              <>
                <ChevronDown size={11} />
                Show more
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
}

export default ResultCard;
