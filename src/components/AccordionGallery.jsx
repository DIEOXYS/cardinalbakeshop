import {useCallback, useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import './AccordionGallery.css';

export default function AccordionGallery({
  items = [], defaultIndex = 2, expandRatio = 0.52, trigger = 'hover',
  accentColor = '#a40943', overlayColor = '#790631', textColor = '#fffaf6',
  grayscale = true, showLabels = true, duration = 0.35, ease = 'power3.out',
  parallax = 0, tilt = 0, height = 460, gap = 10, radius = 12,
  orientation = 'horizontal', className = '', ariaLabel = 'Cardinal product photos',
}) {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const targetRefs = useRef([]);
  const mediaRefs = useRef([]);
  const timelineRef = useRef(null);
  const layoutRef = useRef(null);
  const initializedRef = useRef(false);
  const [active, setActive] = useState(() => Math.max(0, Math.min(Number.isFinite(defaultIndex) ? Math.trunc(defaultIndex) : 0, items.length - 1)));
  const [preferences, setPreferences] = useState({mobile: false, reduced: false});
  const count = items.length;
  const selected = Math.min(active, Math.max(0, count - 1));
  const vertical = orientation === 'vertical';
  const ratio = Math.min(0.9, Math.max(0.2, expandRatio));
  const grow = count > 1 ? ratio * (count - 1) / (1 - ratio) : 1;

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 780px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPreferences({mobile: mobile.matches, reduced: reduced.matches});
    update();
    mobile.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  const applyLayout = useCallback((animate) => {
    const root = rootRef.current;
    if (!root || !count) return;
    timelineRef.current?.kill();
    const rect = root.getBoundingClientRect();
    const usable = Math.max(0, (vertical ? rect.height : rect.width) - gap * (count - 1));
    const mediaSize = Math.max(140, usable * (count === 1 ? 1 : ratio) * 1.22);
    const instant = preferences.mobile || preferences.reduced || !animate;
    const timeline = gsap.timeline();
    panelRefs.current.slice(0, count).forEach((panel, index) => {
      const isActive = index === selected;
      const rotation = instant || isActive ? 0 : index < selected ? tilt : -tilt;
      timeline.to(panel, {
        flexGrow: preferences.mobile ? 1 : isActive ? grow : 1,
        rotateX: vertical ? -rotation : 0,
        rotateY: vertical ? 0 : rotation,
        duration: instant ? 0 : duration, ease,
      }, 0);
      const media = mediaRefs.current[index];
      if (media) {
        const drift = Math.max(-1.5, Math.min(1.5, selected - index));
        const shift = instant || isActive ? 0 : drift * parallax * mediaSize * 0.06;
        gsap.set(media, {width: vertical || preferences.mobile ? '100%' : mediaSize, height: vertical && !preferences.mobile ? mediaSize : '100%'});
        timeline.to(media, {
          xPercent: preferences.mobile ? 0 : -50, yPercent: preferences.mobile ? 0 : -50,
          x: vertical ? 0 : shift, y: vertical ? shift : 0,
          '--ag-gray': grayscale && !isActive && !preferences.mobile ? 1 : 0,
          duration: instant ? 0 : duration, ease,
        }, 0);
      }
    });
    timelineRef.current = timeline;
  }, [count, selected, vertical, gap, ratio, grow, preferences, tilt, parallax, grayscale, duration, ease]);
  layoutRef.current = applyLayout;

  useEffect(() => {
    if (!rootRef.current) return;
    const measure = () => layoutRef.current?.(false);
    const observer = new ResizeObserver(measure);
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [count, gap, height, ratio, vertical]);

  useEffect(() => {
    applyLayout(initializedRef.current);
    initializedRef.current = true;
    return () => timelineRef.current?.kill();
  }, [applyLayout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !showLabels) return;
    const captions = [...root.querySelectorAll('.ag-panel__label')];
    const alignCaptions = () => {
      const height = Math.max(0, ...captions.map((caption) => {
        const styles = getComputedStyle(caption);
        const content = [...caption.children].reduce((total, child) => {
          const childStyles = getComputedStyle(child);
          if (childStyles.display === 'none') return total;
          return total + child.getBoundingClientRect().height + parseFloat(childStyles.marginTop) + parseFloat(childStyles.marginBottom);
        }, 0);
        return content + parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      }));
      root.style.setProperty('--ag-caption-height', `${Math.ceil(height)}px`);
    };
    const observer = new ResizeObserver(alignCaptions);
    captions.forEach((caption) => [...caption.children].forEach((child) => observer.observe(child)));
    alignCaptions();
    return () => observer.disconnect();
  }, [items, showLabels]);

  const handleKeyDown = (event, index) => {
    const isVertical = vertical || preferences.mobile;
    const next = isVertical ? 'ArrowDown' : 'ArrowRight';
    const previous = isVertical ? 'ArrowUp' : 'ArrowLeft';
    let destination;
    if (event.key === next) destination = (index + 1) % count;
    else if (event.key === previous) destination = (index - 1 + count) % count;
    else if (event.key === 'Home') destination = 0;
    else if (event.key === 'End') destination = count - 1;
    if (destination === undefined) return;
    event.preventDefault();
    targetRefs.current[destination]?.focus();
    setActive(destination);
  };

  if (!count) return null;

  return <ul ref={rootRef} className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`} aria-label={ariaLabel}
    style={{'--ag-accent': accentColor, '--ag-overlay': overlayColor, '--ag-text': textColor, '--ag-gap': `${gap}px`, '--ag-radius': `${radius}px`, '--ag-grow': grow, height: `${vertical ? height * 1.6 : height}px`}}>
    {items.map((item, index) => {
      const isActive = index === selected;
      const Target = item.link ? 'a' : 'button';
      return <li key={item.id ?? `${item.image}-${index}`} ref={(element) => {panelRefs.current[index] = element;}} className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
        onPointerEnter={(event) => {if (trigger === 'hover' && event.pointerType === 'mouse' && !rootRef.current.contains(document.activeElement)) setActive(index);}}>
        <Target className="ag-panel__target" ref={(element) => {targetRefs.current[index] = element;}}
          href={item.link || undefined} type={item.link ? undefined : 'button'}
          aria-label={item.link ? `View ${item.label} on the menu` : `Expand ${item.label}`}
          aria-pressed={item.link ? undefined : isActive}
          onFocus={() => setActive(index)} onClick={() => setActive(index)} onKeyDown={(event) => handleKeyDown(event, index)}>
          <span className="ag-panel__frame"><span className="ag-panel__media" ref={(element) => {mediaRefs.current[index] = element;}}>
            <img src={item.image} alt={item.alt ?? item.label ?? ''} width={item.width} height={item.height} loading="lazy" draggable="false" style={{objectPosition: item.position ?? '50% 50%'}}/>
          </span></span>
          {showLabels && <span className="ag-panel__label"><span className="ag-panel__text">{item.label}</span>{item.detail && <span className="ag-panel__detail">{item.detail}</span>}</span>}
        </Target>
      </li>;
    })}
  </ul>;
}
