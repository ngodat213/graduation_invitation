'use client'

import { useState, useEffect, useRef } from 'react'
import { Wrapper } from '~/components/wrapper'
import { Envelope } from '~/components/envelope'
import { gsap } from 'gsap'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)
  const [openStage, setOpenStage] = useState(0) // 0: closed, 1: seal removed, 2: flap opening, 3: card showing
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  const containerRef = useRef<HTMLDivElement>(null)
  const splashTextsRef = useRef<(HTMLParagraphElement | null)[]>([])
  const hasAnimated = useRef(false)

  // Graduation date: February 9, 2026 at 10:00 AM
  const graduationDate = new Date('2026-02-09T10:00:00+07:00')

  // Countdown logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now()
      const target = graduationDate.getTime()
      const difference = target - now

      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Splash animation logic
  useEffect(() => {
    if (!showSplash || hasAnimated.current) return
    hasAnimated.current = true

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => setShowSplash(false),
        })
      },
    })

    // Phase 1: Countdown texts
    const countdownIndices = [0, 1, 2]
    countdownIndices.forEach((index) => {
      const text = splashTextsRef.current[index]
      if (text) {
        timeline.fromTo(text, 
          { opacity: 0, y: 30, rotateX: -15 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' },
          index === 0 ? 0.5 : '+=0.2'
        )
      }
    })

    // Phase 2: Fade out countdown, show final reveal
    timeline.to(countdownIndices.map(i => splashTextsRef.current[i]), {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: 'power2.in',
      stagger: 0.1
    }, '+=1.5')

    const finalText = splashTextsRef.current[3]
    if (finalText) {
      timeline.fromTo(finalText,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.7)' },
        '+=0.2'
      )
    }

    timeline.to({}, { duration: 2.5 })
    return () => { timeline.kill() }
  }, [showSplash])

  // Handle envelope clicks
  const handleEnvelopeClick = () => {
    if (openStage === 0) {
      setOpenStage(1) // Phase 1: Seal removal starts
      setTimeout(() => {
        setOpenStage(2) // Phase 2: Flap starts opening after seal is gone
        setTimeout(() => {
          setOpenStage(3) // Phase 3: Card slides up after flap is open
        }, 800) // Duration of flap rotation (transition is 0.8s)
      }, 500) // Duration of seal transition
    }
    else if (openStage === 3) setOpenStage(4)
    else if (openStage === 4) {
      // Reset if at stage 4
      setOpenStage(0)
      setIsZoomed(false)
    }
  }

  type SplashItem = 
    | { type: 'text'; text: string; isHighlight: boolean }
    | { type: 'countdown'; items: { value: number; label: string }[] }

  const splashTexts: SplashItem[] = [
    { text: 'BIẾT GÌ KHÔNG', isHighlight: true, type: 'text' },
    { text: 'CÒN', isHighlight: true, type: 'text' },
    { 
      type: 'countdown',
      items: [
        { value: timeLeft.days, label: 'NGÀY' },
        { value: timeLeft.hours, label: 'GIỜ' },
        { value: timeLeft.minutes, label: 'PHÚT' },
        { value: timeLeft.seconds, label: 'GIÂY' },
      ]
    },
    { text: 'LÀ TỚI LỄ TỐT NGHIỆP CỦA CÁT TƯỜNG', isHighlight: true, type: 'text' },
  ]
  return (
    <Wrapper theme="light">
      <main 
        className={`relative flex h-screen min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 transition-all duration-1000 ease-out bg-[#EFEDE3] ${
          isZoomed ? 'scale-[1.2] gap-20 md:gap-24' : 'scale-100 gap-6 md:gap-8'
        }`}
      >
        {/* Background Image Layer 1 - Background.png (Bottom layer) */}
        {/* <div className="pointer-events-none absolute bottom-0 left-1/2 -z-30 h-auto w-[2400px] min-w-full -translate-x-1/2 translate-y-50">
          <img
            src="/Background.png"
            alt="Background layer"
            className="h-auto w-full object-cover object-bottom"
          />
        </div> */}

        {/* Splash Screen Overlay */}
        {showSplash && (
          <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 px-6 md:gap-8 bg-[#EFEDE3]"
            style={{ perspective: '1000px' }}
          >
            {/* Splash Background (Same as Home) */}
            {/* <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-auto w-[2400px] min-w-full -translate-x-1/2 translate-y-50">
              <img
                src="/Background.png"
                alt="Background layer"
                className="h-auto w-full object-cover object-bottom"
              />
            </div> */}

            {splashTexts.map((item, index) => {
              if (item.type === 'countdown') {
                return (
                  <div 
                    key={index}
                    ref={(el) => { splashTextsRef.current[index] = el }}
                    className="flex flex-row items-center justify-center gap-4 opacity-0 md:gap-8 lg:gap-12"
                  >
                    {item.items.map((unit, uIndex) => (
                      <div key={uIndex} className="flex flex-col items-center">
                        <span className="text-4xl font-bold text-[#9FCBEA] md:text-6xl lg:text-7xl" style={{ fontFamily: 'var(--font-grotesk)' }}>
                          {unit.value}
                        </span>
                        <span className="text-sm font-medium tracking-widest text-[#9FCBEA] md:text-base lg:text-lg" style={{ fontFamily: 'var(--font-grotesk)' }}>
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              }

              return (
                <p
                  key={index}
                  ref={(el) => { splashTextsRef.current[index] = el }}
                  className="relative z-10 text-center text-4xl font-bold uppercase tracking-wider opacity-0 md:text-6xl lg:text-7xl"
                  style={{
                    fontFamily: 'var(--font-grotesk)',
                    color: item.isHighlight ? 'white' : '#9FCBEA',
                    textShadow: item.isHighlight
                      ? '3px 3px 0px rgba(0, 0, 0, 0.15), 6px 6px 0px rgba(0, 0, 0, 0.08)'
                      : 'none',
                  }}
                >
                  {item.text}
                </p>
              )
            })}
          </div>
        )}

        {/* Top Text */}
        <h1
          className="mt-0 text-center text-7xl font-bold uppercase leading-none tracking-wider md:text-9xl lg:text-[12rem]"
          style={{
            fontFamily: 'var(--font-serif)',
            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.15), 8px 8px 0px rgba(0, 0, 0, 0.08)',
            color: 'white',
          }}
        >
          You're
          <br />
          Invited
        </h1>

        {/* Event Details Row - Hugging Top H1 */}
        <div className="-mt-4 flex w-full max-w-[75vw] items-center justify-between px-2 md:-mt-10 md:max-w-4xl md:px-8">
          <p
            className="text-[9px] font-medium uppercase tracking-tighter sm:text-[10px] md:text-lg"
            style={{
              fontFamily: 'var(--font-grotesk)',
              color: '#9FCBEA',
            }}
          >
            That Day My Graduation
          </p>
          <p
            className="text-[9px] font-medium uppercase tracking-tighter sm:text-[10px] md:text-lg"
            style={{
              fontFamily: 'var(--font-grotesk)',
              color: '#9FCBEA',
            }}
          >
            December 12. 7:00 PM
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Center Space - Interactive Button (visible when not zoomed) */}
        {!isZoomed && (
          <button
            className="group relative z-10 transition-transform duration-300 hover:scale-110 active:scale-95"
            onClick={() => {
              setIsZoomed(true)
              setOpenStage(0)
            }}
          >
            <img
              src="/Button.png"
              alt="Open invitation"
              className="h-auto w-24 animate-pulse md:w-28 lg:w-32"
            />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 -z-10 rounded-full bg-white opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />
          </button>
        )}

        {/* Stage 4: Detailed View - Layers over the envelope */}
        {isZoomed && openStage === 4 && (
          <div 
            className="absolute inset-x-0 bottom-0 top-0 z-[60] flex items-center justify-center animate-fade-in p-6 md:p-12 pointer-events-none"
          >
            <div className="relative flex w-full max-w-4xl items-center justify-center pointer-events-auto">
              {/* Main Card Detail (Tilted Left) - Resized for balance */}
              <div className="relative w-[60%] transform transition-all duration-700 -rotate-2 hover:rotate-0 hover:scale-[1.05] z-10 shadow-lg">
                <img 
                  src="/CardDetail.png" 
                  alt="Invitation Detail" 
                  className="w-full h-auto shadow-2xl rounded-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Photobooth Strip (Right Side - Overlapping) */}
              <div className="flex w-[16%] -ml-10 md:-ml-14 flex-col gap-0 bg-white p-1.5 shadow-2xl border-[6px] border-white transform rotate-3 transition-all duration-700 hover:rotate-0 hover:scale-110 z-20">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="w-full relative group/thumb border-b-[6px] border-white last:border-b-0" style={{ aspectRatio: '1/1' }}>
                    <img 
                      src={`/Thumb${num}.png`} 
                      alt={`Thumbnail ${num}`} 
                      className="w-full h-full object-cover shadow-sm transition-all duration-500 group-hover/thumb:scale-125 group-hover/thumb:z-30 group-hover/thumb:shadow-2xl relative"
                    />
                  </div>
                ))}
                
                {/* Photobooth "footer" or extra space */}
                <div className="h-6 w-full flex items-center justify-center">
                  <div className="w-12 h-1 bg-gray-100 rounded-full opacity-20" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Envelope Card - appears when zoomed, overlays everything */}
        {isZoomed && (
          <div className="absolute inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
            <div 
              className="relative w-[80vw] max-w-[600px] aspect-[16/10] cursor-pointer"
              onClick={handleEnvelopeClick}
            >
              {/* White border shadow */}
              <div className="absolute inset-[-8px] -z-10 bg-white rounded-lg shadow-2xl" />
              
              {/* SVG Envelope */}
              <Envelope className="w-full h-full drop-shadow-2xl" openStage={openStage} />
              
              {/* Invitation Card (Sliding Up) */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 bottom-4 w-[90%] transition-all duration-1000 ease-in-out flex items-center justify-center ${
                  openStage >= 3 ? '-translate-y-1/2 opacity-100' : 'translate-y-0 opacity-0 pointer-events-none'
                }`}
                style={{ zIndex: 1, height: '90%' }}
              >
                <img 
                  src="/invitationCard.png" 
                  alt="Invitation Card" 
                  className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                />
              </div>
              
              {/* Wax Seal / Seal removed animation */}
              <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500 ${
                  openStage >= 1 ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="group relative">
                  <img
                    src="/Button.png"
                    alt="Seal"
                    className="h-auto w-24 md:w-28 lg:w-32 drop-shadow-lg"
                  />
                  <div className="absolute inset-0 -z-10 rounded-full bg-white opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Message Text - Hugging Bottom H1 */}
        <h5
          className="-mb-4 max-w-[80vw] text-center text-[9px] font-medium uppercase tracking-[0.2em] sm:text-[10px] md:-mb-10 md:text-xl md:max-w-3xl"
          style={{
            fontFamily: 'var(--font-grotesk)',
            color: '#9FCBEA',
          }}
        >
          Your Presence Was My Happiness That Day
        </h5>

        {/* Bottom Text */}
        <h1
          className="mb-0 text-center text-7xl font-bold uppercase leading-none tracking-wider md:text-9xl lg:text-[12rem]"
          style={{
            fontFamily: 'var(--font-serif)',
            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.15), 8px 8px 0px rgba(0, 0, 0, 0.08)',
            color: 'white',
          }}
        >
          You're
          <br />
          Invited
        </h1>
      </main>
    </Wrapper>
  )
}
