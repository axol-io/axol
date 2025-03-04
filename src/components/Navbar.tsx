import { useStore } from "@nanostores/react"
import { isMenuOpen } from "../utils/store"
import { Dialog } from "@headlessui/react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Ticker from "framer-motion-ticker"

const announcement = {
  text: "New Status Dashboard!",
  icon: "/images/icon-announcement.svg",
  url: "https://status.axol.io",
}

const navLinks = [
  {
    name: "Features",
    href: "/#featuresSection",
    target: "_self",
  },
  {
    name: "Team",
    href: "/#teamSection",
    target: "_self",
  },
  {
    name: "Contact",
    href: "/#contactSection",
    target: "_self",
  },
  {
    name: "Blog",
    href: "/blog",
    target: "_self",
  },  
  {
    name: "Faucet",
    href: "https://faucet.axol.io",
    target: "_blank",
  },
  {
    name: "Status",
    href: "https://status.axol.io",
    target: "_blank",
  },
]

const navContainer = {
  visible: {
    // y: 0,
    opacity: 1,
    transition: {
      x: { velocity: 100 },
      duration: 0.3,
    },
  },
  hidden: {
    // y: -250,
    opacity: 0,
    transition: {
      x: { velocity: 100 },
      duration: 0.3,
    },
  },
}

export default function Navbar() {
  const $isMenuOpen = useStore(isMenuOpen)
  const ref = useRef<HTMLElement>(document.getElementById("topSection"))
  const isInView = useInView(ref, { once: false })

  return (
    <div className="flex w-full flex-col items-center justify-start gap-12 md:w-auto">
      <a
        className={
          `fixed z-20 mt-0 hidden flex-row items-center justify-center gap-2 rounded-bl-full rounded-br-full border-transparent bg-axol-coral px-6 py-1 shadow-md transition-all duration-300 hover:border-node-indigo md:flex md:border-b-2 md:border-l-2 md:border-crypto-frost/75 ` +
          (isInView ? "opacity-0 md:hidden" : "opacity-100 md:visible")
        }
        href={announcement.url}>
        <img
          src={announcement.icon}
          alt="Announcement"
          loading="eager"
          decoding="sync"
        />
        <p className="font-body text-body-sm text-node-indigo">
          {announcement.text}
        </p>
      </a>
      <header className="fixed z-20 mt-12 inline-flex w-full flex-col items-center justify-start md:mt-12 md:w-auto">
        <a
          className={
            `hidden h-auto w-fit items-center justify-center gap-2 rounded-tl-full rounded-tr-full border-x-2 border-t-2 border-transparent bg-axol-coral px-6 py-1 transition-all duration-300 hover:border-node-indigo md:inline-flex ` +
            (isInView ? "opacity-100 md:visible" : "opacity-0 md:invisible")
          }
          href={announcement.url}>
          <img
            src={announcement.icon}
            alt="Announcement"
            loading="eager"
            decoding="sync"
          />
          <p className="font-body text-body-sm text-node-indigo ">
            {announcement.text}
          </p>
        </a>
        <nav
          className="flex w-full items-center justify-between gap-12 rounded-full px-4 md:w-auto md:border-l-2 md:border-t-2 md:border-crypto-frost/75 md:bg-axol-coral md:px-8 md:pb-2 md:pt-[10px] md:shadow-md"
          aria-label="Global">
          <a
            href="/"
            className="rounded-full border-x border-b-4 border-t border-node-indigo bg-axol-coral px-4 py-2 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:pb-[4px] md:pt-0">
            <span className="sr-only">Axol.io</span>
            <img
              className="h-[36px] w-auto md:h-10 hover:scale-105 transition-all duration-300 ease-in-out"
              src="/images/logo-primary-node-indigo.svg"
              alt="Axol.io Logo"
              loading="eager"
              decoding="sync"
            />
          </a>
          <div className="flex items-start justify-end md:hidden">
            <button
              type="button"
              className="flex rounded-[6px] border-x border-b-4 border-t border-node-indigo bg-axol-coral p-2 md:hidden"
              aria-label="Menu button"
              onClick={() => isMenuOpen.set(!$isMenuOpen)}>
              <span className="sr-only">Open main menu</span>
              <img
                src="/images/icon-menu.svg"
                className="h-8 w-8"
                aria-hidden="true"
                alt="Menu icon"
                loading="eager"
                decoding="sync"
              />
            </button>
          </div>
          <div className="hidden md:flex md:gap-x-6">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.target}
                data-target={item.href}
                className="rounded-[4px] border-b-4 border-transparent font-display text-nav lowercase text-node-indigo transition-all duration-300 hover:border-node-indigo">
                {item.name}
              </a>
            ))}
          </div>
        </nav>
        <Dialog
          as="div"
          className="md:hidden"
          open={$isMenuOpen}
          onClose={() => isMenuOpen.set(!$isMenuOpen)}>
          <Dialog.Panel className="fixed inset-y-0 right-0 z-30 flex w-full h-screen flex-col items-end justify-start gap-4 overflow-y-auto px-4 py-[50px]">
            <div className="flex w-full items-start justify-end">
              <button
                type="button"
                className="flex rounded-[6px] border-x border-b border-t border-node-indigo bg-axol-coral p-2"
                aria-label="Close button"
                onClick={() => isMenuOpen.set(!$isMenuOpen)}>
                <span className="sr-only">Close menu</span>
                <img
                  src="/images/icon-close.svg"
                  className="h-8 w-8"
                  aria-hidden="true"
                  alt="Close menu icon"
                  loading="eager"
                  decoding="sync"
                />
              </button>
            </div>
            <motion.div
              className=" flex flex-col items-center justify-center gap-6 rounded-[6px] border-x border-b-6 border-t border-node-indigo bg-axol-coral px-24 py-6 text-center"
              initial="hidden"
              animate={$isMenuOpen ? "visible" : "hidden"}
              exit="hidden"
              variants={navContainer}>
              {navLinks.map((item) => (
                <button
                  onClick={() => isMenuOpen.set(!$isMenuOpen)}>
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.target}
                    className="flex w-fit rounded-[4px] border-b-4 border-transparent font-display text-nav lowercase text-node-indigo transition-all duration-300 hover:border-node-indigo">
                    {item.name}
                  </a>
                </button>
              ))}
            </motion.div>
            <div className="w-full h-full">
              <button className="w-full h-full"
                onClick={() => isMenuOpen.set(!$isMenuOpen)} />
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div className="fixed z-20 mt-0 flex w-full flex-row gap-2 bg-axol-coral py-2 shadow-md md:static md:z-0 md:block md:h-0 md:w-0 md:py-0">
        <Ticker duration={20}>
          <a
            className="mx-2 flex flex-row gap-2"
            href={announcement.url}>
            <img
              src={announcement.icon}
              alt="Announcement"
              loading="eager"
              decoding="sync"
            />
            <p className="font-body text-body-sm text-node-indigo">
              {announcement.text}
            </p>
          </a>
          <a
            className="mx-2 flex flex-row gap-2"
            href={announcement.url}>
            <img
              src={announcement.icon}
              alt="Announcement"
              loading="eager"
              decoding="sync"
            />
            <p className="font-body text-body-sm text-node-indigo">
              {announcement.text}
            </p>
          </a>
        </Ticker>
      </div>
    </div>
  )
}
