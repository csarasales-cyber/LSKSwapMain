
# LSKSwap — Audit & Deployment Notes

This project contains the front-end (React+Vite) that integrates with:
- LSK token: 0x3148F0032Be3Bf58C469Feb154C0DE3fa88F521D
- LSKStaking contract: 0x64949E602397ec28808EcDDe22841cbd04Df58F7
- PancakeSwap Router: 0x10ED43C718714eb63d5aA57B78B54704E256024E

## Running locally
1. `npm install`
2. `npm run dev`
3. Visit http://localhost:5173

## Vercel
- This repo includes `vercel.json`. Configure your Vercel project to use Node 18+ runtime if necessary.

## Hardhat tests (fork)
There is a Hardhat test scaffold under `test/` that uses BSC mainnet fork. To run tests:
1. Set environment variable `BSC_RPC_URL` (an archival BSC RPC endpoint) in your shell.
2. `npm install`
3. `npx hardhat test`

The tests are basic smoke checks and meant for developer sanity on a forked network. They require a valid RPC.

## Security checklist (for auditors / devs)
- [ ] Use full ERC20 ABI and robust decimals handling for tokens. (Implemented in front-end)
- [ ] Never set `amountOutMin` to 0 — compute it using the quote and slippage. (Implemented)
- [ ] Add gas estimation & better error handling for tx reverts.
- [ ] Input validation for token addresses (ensuring checksum) and amounts.
- [ ] Do not rely on `selectedAddress` — subscribe to `accountsChanged` and `chainChanged` events.
- [ ] Use precise unit conversions — `parseUnits` and `formatUnits` with correct decimals per token.
- [ ] Add unit tests (ethers-mock, Hardhat/Foundry integration tests against forked BSC mainnet).
- [ ] Pin and audit dependencies.

## Recommended audit steps
1. Static analysis of smart contracts (Slither, MythX).
2. Dynamic testing (Foundry/Hardhat) including property tests and fuzzing.
3. Front-end security review: XSS, supply-chain (npm deps), CSP header.
4. Third-party dependency update and lockfile pinning.
5. Manual review of the approve/transfer flows (reentrancy concerns in contracts, if any).
6. Penetration test on staging environment.

## Known limitations in this front-end bundle
- Minimal ABIs used in some places — for production include full ABIs and token decimals lookup.
- swap function computes minOut from `getAmountsOut` and slippage, but consider more advanced protections (deadline, price oracles).
- No analytics or telemetry included (recommended to add opt-in analytics in production).


## Production / Mainnet deploy

1. Ensure `.env.production` has correct `VITE_*` variables or set environment variables in Vercel.
2. Run `npm install` and `npm run build` to create production build in `dist/`.
3. Deploy `dist/` to Vercel (or connect repo and set Vercel environment vars accordingly).

**IMPORTANT:** Double-check `swap` slippage and `amountOutMin` behavior before allowing real funds. Always audit contracts and run tests on a fork.
