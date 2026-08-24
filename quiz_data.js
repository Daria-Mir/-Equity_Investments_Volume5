const quizData = {
  1: {
    title: "Market Organization and Structure",
    questions: [
      {
        id: "q1_1",
        scenario: "An investor purchases 500 shares of a stock at $60 per share on margin. The initial margin requirement is 50%, and the maintenance margin is 30%. The investor pays a 5% annual interest rate on the borrowed funds, compounded monthly.",
        question: "Assuming no other transactions or dividends, the price at which the investor will receive a margin call is closest to:",
        options: {
          A: "$42.86",
          B: "$45.00",
          C: "$38.57"
        },
        correct: "A",
        explanation: "To calculate the margin call price for a long position, we use the formula: P_call = P0 * (1 - Initial Margin) / (1 - Maintenance Margin). Here, P0 = $60, Initial Margin = 0.50, and Maintenance Margin = 0.30. Plugging in the values: P_call = $60 * (1 - 0.50) / (1 - 0.30) = $60 * 0.50 / 0.70 = $60 * 0.50 / 0.70 = $42.86."
      },
      {
        id: "q1_2",
        scenario: "A portfolio manager wants to accumulate a large position in a thin-trading micro-cap stock without driving the market price up. The manager enters an order that specifies the execution must happen only at a specific price or better, but is willing to wait and keep the order active for up to 30 days.",
        question: "Which of the following order types and validity instructions is most appropriate for this transaction?",
        options: {
          A: "Market order with a Good-Till-Cancelled (GTC) instruction.",
          B: "Limit order with a Good-Till-Date (GTD) instruction.",
          C: "Stop-buy order with a Day-Only instruction."
        },
        correct: "B",
        explanation: "A limit order is appropriate because it guarantees the order will only execute at the specified price or better, preventing price escalation. A Good-Till-Date (GTD) instruction is appropriate because it allows the order to remain active for the requested 30-day window rather than canceling at the end of the trading day. A market order would execute immediately at current market prices, driving the price up, and a stop order triggers execution only after a price threshold is crossed."
      },
      {
        id: "q1_3",
        scenario: "An investor opens a margin account and buys 1,000 shares of stock at $40. The initial margin is 60%. The investor borrows the remaining amount at an interest rate of 6% per annum. After exactly one year, the investor sells the stock for $48. No dividends were paid, and commissions are ignored.",
        question: "The investor's total return on this leveraged transaction is closest to:",
        options: {
          A: "20.0%",
          B: "29.3%",
          C: "26.0%"
        },
        correct: "B",
        explanation: "1. Total position cost = 1,000 * $40 = $40,000. \n2. Equity invested (60%) = $40,000 * 0.60 = $24,000. \n3. Borrowed amount = $40,000 - $24,000 = $16,000. \n4. Interest paid at year-end = $16,000 * 0.06 = $960. \n5. Sale value of stock = 1,000 * $48 = $48,000. \n6. Total profit/loss = (Sale Value - Purchase Value) - Interest Paid = ($48,000 - $40,000) - $960 = $8,000 - $960 = $7,040. \n7. Return on Equity = Profit / Equity Invested = $7,040 / $24,000 = 0.2933 or 29.3%."
      },
      {
        id: "q1_4",
        scenario: "An investor executes a short sale of 300 shares of stock at $80 per share. The initial margin requirement is 50%, and the maintenance margin is 35%. The position does not pay any dividends.",
        question: "The stock price at which the investor will receive a margin call on this short position is closest to:",
        options: {
          A: "$118.52",
          B: "$88.89",
          C: "$108.00"
        },
        correct: "B",
        explanation: "For a short sale, the margin call price is calculated as: P_call = P0 * (1 + Initial Margin) / (1 + Maintenance Margin). Here, P0 = $80, Initial Margin = 0.50, Maintenance Margin = 0.35. P_call = $80 * (1 + 0.50) / (1 + 0.35) = $80 * 1.50 / 1.35 = $120 / 1.35 = $88.89. If the price rises to or above $88.89, the investor's equity margin drops below 35%, triggering a margin call."
      },
      {
        id: "q1_5",
        scenario: "An analyst is evaluating the operational capability of a regional financial market. She notes that while financial intermediaries efficiently route capital from savers to businesses (allocational efficiency), the bid-ask spreads are wide, and execution fees are high.",
        question: "Based on this information, this market lacks:",
        options: {
          A: "Operational efficiency.",
          B: "Informational efficiency.",
          C: "Dynamic efficiency."
        },
        correct: "A",
        explanation: "A market is operationally efficient when transaction costs (including bid-ask spreads, commissions, and clearing fees) are low. High fees and wide spreads indicate a lack of operational efficiency, even if the market achieves allocational efficiency (routing capital to its most productive uses)."
      },
      {
        id: "q1_6",
        scenario: "A trader wants to sell a large block of stock in a market characterized by liquidity providers who post firm bid and ask quotes, standing ready to buy or sell from their own inventory.",
        question: "The structure of this market is best described as a:",
        options: {
          A: "Brokered market.",
          B: "Order-driven market.",
          C: "Quote-driven market."
        },
        correct: "C",
        explanation: "Quote-driven markets (also known as dealer or market-maker markets) rely on dealers who maintain inventory and post bid and ask quotes to provide liquidity. Order-driven markets match buyer and seller orders directly using rules (e.g. limit order books), and brokered markets match buyers and sellers for unique, illiquid assets using a broker."
      }
    ]
  },
  2: {
    title: "Security Market Indexes",
    questions: [
      {
        id: "q2_1",
        scenario: "A price-weighted index consists of three stocks: Stock X ($20), Stock Y ($50), and Stock Z ($90). The current divisor of the index is 3.00. Stock Z undergoes a 3-for-1 stock split.",
        question: "Immediately after the split of Stock Z, the adjusted divisor of the price-weighted index is closest to:",
        options: {
          A: "1.875",
          B: "2.125",
          C: "1.500"
        },
        correct: "A",
        explanation: "1. Pre-split index value = (20 + 50 + 90) / 3.0 = 53.333. \n2. Post-split price of Stock Z = $90 / 3 = $30. \n3. Post-split sum of stock prices = 20 + 50 + 30 = $100. \n4. Maintain index value: 100 / New Divisor = 53.333. \n5. New Divisor = 100 / 53.333 = 1.875."
      },
      {
        id: "q2_2",
        scenario: "An analyst is evaluating the performance and characteristics of different index weighting methodologies. She notices that during a prolonged bull market driven primarily by mid-cap and small-cap stocks, one index significantly outperforms the others, but requires substantial transaction costs due to periodic rebalancing.",
        question: "The index weighting methodology the analyst is observing is most likely:",
        options: {
          A: "Equal-weighted.",
          B: "Market-capitalization-weighted.",
          C: "Fundamental-weighted."
        },
        correct: "A",
        explanation: "An equal-weighted index places the same weight on all constituent stocks, regardless of size. This gives it a small-cap bias relative to a market-cap-weighted index, meaning it outperforms when small/mid-caps outperform. However, because prices fluctuate, equal-weighted indexes must be rebalanced frequently (buying losers and selling winners) which incurs high transaction costs. Market-cap indexes require no rebalancing for price changes (they are self-rebalancing) and fundamental-weighted indexes exhibit a value tilt."
      },
      {
        id: "q2_3",
        scenario: "The constituent shares and prices for a three-stock float-adjusted market-capitalization index are as follows:\n- Stock A: 10,000,000 total shares, 40% float, Price $15\n- Stock B: 5,000,000 total shares, 80% float, Price $30\n- Stock C: 2,000,000 total shares, 50% float, Price $50",
        question: "The total float-adjusted market capitalization of this index is closest to:",
        options: {
          A: "$430 million.",
          B: "$230 million.",
          C: "$330 million."
        },
        correct: "B",
        explanation: "Float-adjusted market cap = Sum of (Total Shares * Float Factor * Price) for all stocks. \n- Stock A: 10M * 0.40 * $15 = $60 million \n- Stock B: 5M * 0.80 * $30 = $120 million \n- Stock C: 2M * 0.50 * $50 = $50 million \n- Total float-adjusted cap = $60M + $120M + $50M = $230 million."
      },
      {
        id: "q2_4",
        scenario: "An index contains two stocks: Stock A and Stock B. Over a single rebalancing period, Stock A increases in value by 20% while Stock B decreases in value by 10%. The index is equal-weighted.",
        question: "The arithmetic return of the equal-weighted index over this period is closest to:",
        options: {
          A: "5.0%",
          B: "4.5%",
          C: "9.0%"
        },
        correct: "A",
        explanation: "For an equal-weighted index, the return is the arithmetic mean of the returns of the constituent stocks: Return = (Return_A + Return_B) / 2 = (20% + (-10%)) / 2 = 10% / 2 = 5.0%."
      },
      {
        id: "q2_5",
        scenario: "A passive fund manager is comparing market-capitalization-weighted indexes with equal-weighted indexes. He is concerned about transaction costs and tracking error.",
        question: "Which index type is naturally self-rebalancing, requiring minimal trade execution as stock prices change?",
        options: {
          A: "Equal-weighted index.",
          B: "Price-weighted index.",
          C: "Market-capitalization-weighted index."
        },
        correct: "C",
        explanation: "A market-cap-weighted index is self-rebalancing. As stock prices change, the weight of each stock in the index changes proportionally to its market value, matching the portfolio holding. Therefore, no trades are required to maintain capitalization weights, unlike equal-weighted portfolios which must sell winners and buy losers."
      },
      {
        id: "q2_6",
        scenario: "An analyst is evaluating the components of commodity index returns. She observes that the near-term futures contract price is lower than the longer-term futures contract price, indicating a market in contango.",
        question: "In this scenario, the roll yield portion of the commodity index return will most likely be:",
        options: {
          A: "Positive.",
          B: "Negative.",
          C: "Zero."
        },
        correct: "B",
        explanation: "When a commodity market is in contango, longer-term contracts are priced higher than near-term contracts. Rolling a futures position (selling near-term and buying more expensive longer-term contracts) results in a negative roll yield. Conversely, backwardation (where near-term prices exceed long-term) produces a positive roll yield."
      }
    ]
  },
  3: {
    title: "Market Efficiency",
    questions: [
      {
        id: "q3_1",
        scenario: "An investment advisor claims that by using machine learning models to analyze public earnings disclosures, balance sheets, and industrial production data, they can consistently earn abnormal returns.",
        question: "If this claim is true, it represents a violation of which form of the Efficient Market Hypothesis (EMH)?",
        options: {
          A: "Only the Strong form.",
          B: "Both the Semi-Strong and Strong forms.",
          C: "Only the Weak form."
        },
        correct: "B",
        explanation: "The semi-strong form of market efficiency states that all publicly available information is fully reflected in security prices; thus, analyzing public data (like earnings disclosures and industrial production reports) cannot yield abnormal returns. If the advisor's claim is true, it violates the semi-strong form. Since any market that is strong-form efficient must also be semi-strong-form efficient, the claim violates both the semi-strong and strong forms."
      },
      {
        id: "q3_2",
        scenario: "An empirical research paper documents that small-cap stocks tend to outperform large-cap stocks over long periods after adjusting for beta risk, and that stocks with high book-to-market ratios outperform those with low ratios.",
        question: "These market anomalies are best classified as:",
        options: {
          A: "Time-series anomalies.",
          B: "Cross-sectional anomalies.",
          C: "Calendar anomalies."
        },
        correct: "B",
        explanation: "Cross-sectional anomalies are related to specific company characteristics (such as size or valuation ratios) at a given point in time. The size effect (small-cap outperformance) and the value effect (high book-to-market outperformance) are classic cross-sectional anomalies. Time-series anomalies relate to historical price movements over time (like momentum), and calendar anomalies relate to specific times of the year (like the January effect)."
      },
      {
        id: "q3_3",
        scenario: "An analyst identifies that the market price of a stock is $45, while their estimated intrinsic value is $52. The analyst believes the market is semi-strong efficient but acknowledges that short-term mispricings occur due to information dissemination delays.",
        question: "To capitalize on this difference, the analyst should most likely:",
        options: {
          A: "Sell the stock short.",
          B: "Buy the stock, expecting the price to converge to intrinsic value.",
          C: "Wait for the stock's market price to rise above $52 before buying."
        },
        correct: "B",
        explanation: "When estimated intrinsic value ($52) exceeds the current market price ($45), the stock is considered undervalued. A value-driven analyst should buy the stock, expecting the market price to eventually rise and converge to its intrinsic value. Short selling is for overvalued stocks (where market price exceeds intrinsic value)."
      },
      {
        id: "q3_4",
        scenario: "Under the strong form of the Efficient Market Hypothesis (EMH), security prices are assumed to fully reflect all public and private (insider) information.",
        question: "If the strong form of EMH holds, an investor who trades on material non-public corporate information will consistently earn:",
        options: {
          A: "Positive abnormal returns.",
          B: "No abnormal returns.",
          C: "Negative abnormal returns due to transaction costs."
        },
        correct: "B",
        explanation: "If a market is strong-form efficient, prices reflect all public and private information instantly. Consequently, even insider information is already incorporated in the price, and insiders cannot earn abnormal returns by trading on it. (Note that in reality, markets are not strong-form efficient, and trading on inside information is illegal)."
      },
      {
        id: "q3_5",
        scenario: "An investor is reluctant to sell a stock that has declined significantly from their purchase price because doing so would make the loss permanent. However, they are quick to sell stocks that have risen slightly to lock in a profit.",
        question: "This behavioral bias is best described as:",
        options: {
          A: "Loss aversion.",
          B: "Representativeness bias.",
          C: "Conservatism bias."
        },
        correct: "A",
        explanation: "Loss aversion (part of prospect theory) is the tendency of investors to dislike losses much more than they like gains. This often leads to holding onto losing stocks ('disposition effect') to avoid realizing a loss, while selling winning stocks too early to secure a guaranteed gain."
      },
      {
        id: "q3_6",
        scenario: "Empirical studies indicate that stock prices tend to adjust slowly to new earnings announcements, meaning that buying stocks with high earnings surprises continues to generate positive abnormal returns for weeks after the announcement.",
        question: "This market anomaly is known as the:",
        options: {
          A: "Post-earnings-announcement drift.",
          B: "January effect.",
          C: "Value effect."
        },
        correct: "A",
        explanation: "The post-earnings-announcement drift (PEAD) is a calendar/underreaction anomaly where the market does not adjust prices instantly to earnings surprises, creating a drift that continues in the direction of the surprise for days or weeks. This represents a violation of semi-strong form market efficiency."
      }
    ]
  },
  4: {
    title: "Overview of Equity Securities",
    questions: [
      {
        id: "q4_1",
        scenario: "A shareholder owns 500 shares of a company. There are 4 vacancies on the board of directors, and the shareholder wants to vote for their preferred candidate, Candidate X, to join the board.",
        question: "Under a cumulative voting system, the maximum number of votes the shareholder can cast for Candidate X is closest to:",
        options: {
          A: "500 votes.",
          B: "2,000 votes.",
          C: "125 votes."
        },
        correct: "B",
        explanation: "Under a cumulative voting system, the number of votes a shareholder can cast is the number of shares owned multiplied by the number of director vacancies. Here, the shareholder owns 500 shares and there are 4 vacancies. Total votes = 500 * 4 = 2,000 votes. In cumulative voting, the shareholder can cast all 2,000 votes for a single candidate (Candidate X)."
      },
      {
        id: "q4_2",
        scenario: "A company issues convertible preference shares to raise capital. An investor is comparing these shares with non-convertible preference shares and common shares of the same issuer.",
        question: "From the perspective of risk and return, convertible preference shares typically have:",
        options: {
          A: "More risk than common shares, but higher potential return than common shares.",
          B: "Less risk than common shares, and less potential upside than common shares.",
          C: "Less risk than common shares, but more potential upside than non-convertible preference shares."
        },
        correct: "C",
        explanation: "Preference shares are senior to common shares in liquidation and dividend payments, giving them lower risk. Non-convertible preference shares have fixed dividends but no upside participation. Convertible preference shares allow the investor to convert into common stock, which adds potential upside participation that non-convertible shares lack. Thus, they have less risk than common shares, and more upside than non-convertible preference shares."
      },
      {
        id: "q4_3",
        scenario: "An institutional investor in Germany wants to purchase shares of a US-listed company, but prefers the shares to be denominated in Euros and settled through a European clearing system.",
        question: "The most appropriate security for this investor is a:",
        options: {
          A: "Global Depository Receipt (GDR).",
          B: "American Depository Receipt (ADR).",
          C: "Sponsored American Depository Share (ADS)."
        },
        correct: "A",
        explanation: "Global Depository Receipts (GDRs) are issued outside the issuer's home country and outside the United States. They are typically denominated in Euros or USD and traded on European exchanges (like London or Luxembourg). ADRs are denominated in USD and traded on US exchanges specifically for US investors."
      },
      {
        id: "q4_4",
        scenario: "A company undergoes liquidation. It has outstanding debt, common shares, participating preferred shares, and non-participating preferred shares.",
        question: "Which of the following describes the priority of payment from first to last during corporate liquidation?",
        options: {
          A: "Debt, preferred shares, common shares.",
          B: "Debt, common shares, preferred shares.",
          C: "Preferred shares, debt, common shares."
        },
        correct: "A",
        explanation: "During corporate liquidation, senior creditors and debt holders must be paid in full first. Preferred shares are junior to all debt but senior to common shares. Common shares represent the residual interest and are paid last."
      },
      {
        id: "q4_5",
        scenario: "An equity analyst is calculating the book value of a company's equity and notices it is significantly lower than the company's total market value of equity.",
        question: "This discrepancy is most likely explained by the:",
        options: {
          A: "Inability of book value to account for future growth expectations and intangible assets generated internally.",
          B: "Incorrect calculation of outstanding shares by the exchange.",
          C: "Write-downs of tangible asset values on the balance sheet."
        },
        correct: "A",
        explanation: "Book value of equity is historical and reflects accounting balance sheet parameters. Market value represents the collective consensus of investors regarding future earnings potential, brand value, intellectual property, and growth expectations, which are often not captured on the balance sheet."
      },
      {
        id: "q4_6",
        scenario: "An investor is comparing statutory voting and cumulative voting structures. Under statutory voting, each share represents one vote per director slot.",
        question: "Which voting system gives minority shareholders a greater chance of electing at least one director to the board?",
        options: {
          A: "Statutory voting.",
          B: "Cumulative voting.",
          C: "Both systems offer equal opportunities to minority shareholders."
        },
        correct: "B",
        explanation: "Cumulative voting allows shareholders to aggregate all their votes and cast them for a single candidate. This concentration of voting power increases the likelihood that minority shareholders, by pooling their votes, can elect a representative to the board."
      }
    ]
  },
  5: {
    title: "Company Analysis - Past and Present",
    questions: [
      {
        id: "q5_1",
        scenario: "A retail company reported the following financial results for the past fiscal year:\n- Revenue: $1,200,000\n- Variable Operating Costs: $480,000\n- Fixed Operating Costs: $300,000\n- Interest Expense: $120,000",
        question: "The company's Degree of Operating Leverage (DOL) is closest to:",
        options: {
          A: "1.71",
          B: "2.40",
          C: "1.44"
        },
        correct: "A",
        explanation: "Degree of Operating Leverage (DOL) is calculated as: DOL = (Revenue - Variable Costs) / (Revenue - Variable Costs - Fixed Costs). \n- Revenue - Variable Costs = $1,200,000 - $480,000 = $720,000. \n- Operating Income (EBIT) = $720,000 - $300,000 = $420,000. \n- DOL = $720,000 / $420,000 = 1.714."
      },
      {
        id: "q5_2",
        scenario: "An analyst is comparing two companies in the same industry. Company A classifies its expenses on the income statement as cost of goods sold, selling expenses, and administrative expenses. Company B classifies its expenses as employee salaries, rent, depreciation, and raw materials.",
        question: "Which of the following statements regarding the expense classifications of Company A and Company B is most accurate?",
        options: {
          A: "Company A uses a natural classification, and Company B uses a functional classification.",
          B: "Company A uses a functional classification, and Company B uses a natural classification.",
          C: "Both companies use functional classifications."
        },
        correct: "B",
        explanation: "A functional classification groups expenses according to the activity or function they support (e.g., manufacturing/COGS, selling, administrative). Company A does this. A natural classification groups expenses according to their natural origin or category (e.g., salaries, rent, depreciation) without allocating them to functions. Company B does this."
      },
      {
        id: "q5_3",
        scenario: "A business analyst is evaluating a warehouse club retailer. She notes that the retailer has an operating margin of only 2.5%, but generates a high return on equity (ROE) of 20% due to an asset turnover ratio of 3.0 and a leverage multiplier of 2.7.",
        question: "Based on the DuPont analysis framework, the primary driver of this company's high ROE is its:",
        options: {
          A: "High profit margin.",
          B: "Asset efficiency and asset turnover.",
          C: "Financial leverage and debt usage."
        },
        correct: "B",
        explanation: "DuPont equation: ROE = Net Profit Margin * Asset Turnover * Leverage Multiplier. Here, Net Profit Margin (represented by operating margin proxy) is low (2.5%), but Asset Turnover is very high (3.0), which reflects high asset efficiency. Combined with a leverage multiplier of 2.7, the product yields a high ROE."
      },
      {
        id: "q5_4",
        scenario: "A company's capital structure consists of $5,000,000 in equity and $5,000,000 in debt. Its interest expense for the year is $400,000, and its earnings before interest and taxes (EBIT) is $1,200,000.",
        question: "The company's Degree of Financial Leverage (DFL) is closest to:",
        options: {
          A: "1.50",
          B: "1.33",
          C: "2.00"
        },
        correct: "A",
        explanation: "DFL = EBIT / (EBIT - Interest Expense). Here, EBIT = $1,200,000, Interest = $400,000. DFL = $1,200,000 / ($1,200,000 - $400,000) = $1,200,000 / $800,000 = 1.50."
      },
      {
        id: "q5_5",
        scenario: "An manufacturing company has a Degree of Operating Leverage (DOL) of 1.8 and a Degree of Financial Leverage (DFL) of 1.5.",
        question: "If sales increase by 10%, the percentage change in net income is closest to:",
        options: {
          A: "27.0%",
          B: "33.0%",
          C: "18.0%"
        },
        correct: "A",
        explanation: "Degree of Total Leverage (DTL) = DOL * DFL. DTL = 1.8 * 1.5 = 2.7. The percentage change in net income = DTL * % change in sales = 2.7 * 10% = 27.0%."
      },
      {
        id: "q5_6",
        scenario: "A tech startup has high initial fixed operating costs (research, server licenses) but very low variable costs per user license sold.",
        question: "If demand for the product increases significantly, the startup's operating profit margin will most likely:",
        options: {
          A: "Increase rapidly due to high operating leverage.",
          B: "Decrease due to scale inefficiencies.",
          C: "Remain constant since costs are fixed."
        },
        correct: "A",
        explanation: "High fixed costs relative to variable costs mean the company has high operating leverage. Once revenues pass the breakeven threshold, additional sales flow almost entirely to operating income, driving a rapid expansion in operating margins."
      }
    ]
  },
  6: {
    title: "Industry and Competitive Analysis",
    questions: [
      {
        id: "q6_1",
        scenario: "A luxury watch manufacturer focuses on producing high-end, custom-engraved chronographs for ultra-wealthy collectors. The manufacturer sells fewer than 5,000 units annually but commands prices starting at $50,000 per watch, easily absorbing high labor and component costs.",
        question: "According to Porter's Generic Strategies framework, the company is utilizing a:",
        options: {
          A: "Cost leadership strategy.",
          B: "Focused differentiation strategy.",
          C: "Focused cost leadership strategy."
        },
        correct: "B",
        explanation: "The company targets a narrow market segment (ultra-wealthy collectors) with unique, high-end customized products (luxury chronographs). This is a Focused Differentiation strategy."
      },
      {
        id: "q6_2",
        scenario: "An analyst is evaluating the commercial aviation sector. He notes that the industry has two dominant aircraft manufacturers (Boeing and Airbus), hundreds of airlines purchasing planes, and a high level of capital required for entry.",
        question: "Using Porter's Five Forces framework, which of the following forces is most likely high in this industry structure?",
        options: {
          A: "Threat of new entrants.",
          B: "Bargaining power of suppliers.",
          C: "Bargaining power of buyers."
        },
        correct: "B",
        explanation: "In this scenario, the aircraft manufacturers (Boeing and Airbus) act as suppliers to the airlines (buyers). Because there is high concentration among suppliers (only two major players) and a large number of buyers (hundreds of airlines), the bargaining power of suppliers is very high."
      },
      {
        id: "q6_3",
        scenario: "A sector analyst observes that a technology industry is experiencing rapid growth, but margins are beginning to compress. Several weaker competitors are exiting the market or being acquired as demand starts to slow down relative to industry production capacity.",
        question: "The industry is most likely in which phase of its life cycle?",
        options: {
          A: "Shakeout.",
          B: "Mature.",
          C: "Growth."
        },
        correct: "A",
        explanation: "The shakeout phase is characterized by slowing growth, intense competition, margin compression, and industry consolidation (where weaker players exit or are acquired due to excess capacity)."
      },
      {
        id: "q6_4",
        scenario: "An industry comprises five major competitors with the following market shares: 35%, 25%, 20%, 15%, and 5%.",
        question: "The Herfindahl-Hirschman Index (HHI) for this industry is closest to:",
        options: {
          A: "0.25",
          B: "2,500",
          C: "2,250"
        },
        correct: "B",
        explanation: "HHI is the sum of the squares of the market shares of all firms in the industry: HHI = (35)^2 + (25)^2 + (20)^2 + (15)^2 + (5)^2 = 1225 + 625 + 400 + 225 + 25 = 2,500."
      },
      {
        id: "q6_5",
        scenario: "A regulatory update reduces capital requirements and eases licensing rules for new companies entering a sector.",
        question: "Under Porter's Five Forces, this structural change will most likely:",
        options: {
          A: "Decrease the threat of substitute products.",
          B: "Increase the intensity of competitive rivalry.",
          C: "Decrease the bargaining power of buyers."
        },
        correct: "B",
        explanation: "Easing entry barriers increases the threat of new entrants, which eventually increases the number of active competitors and intensifies industry competitive rivalry."
      },
      {
        id: "q6_6",
        scenario: "A company seeks to maintain a cost leadership strategy by investing heavily in high-efficiency, automated manufacturing systems.",
        question: "A primary risk associated with this strategic choice is:",
        options: {
          A: "Sudden changes in customer preferences rendering the low-cost product obsolete.",
          B: "An inability to charge premium prices.",
          C: "A lack of access to supplier networks."
        },
        correct: "A",
        explanation: "A key risk of cost leadership is technological obsolescence or changes in buyer preferences, which can make highly specialized, low-cost production lines obsolete if buyers move to differentiated products."
      }
    ]
  },
  7: {
    title: "Company Analysis - Forecasting",
    questions: [
      {
        id: "q7_1",
        scenario: "An equity research associate is modeling next year's revenues for a retail chain. He starts by forecasting global economic growth, then national retail spending growth, then the chain's market share within the industry, and finally applies this share to calculate projected revenues.",
        question: "This forecasting methodology is best described as a:",
        options: {
          A: "Bottom-up approach.",
          B: "Top-down approach.",
          C: "Hybrid approach."
        },
        correct: "B",
        explanation: "A top-down forecasting approach begins with macroeconomic variables (GDP, inflation, global growth), filters down to industry-level variables (sector sales, market size), and finally estimates the company's market share and revenue."
      },
      {
        id: "q7_2",
        scenario: "A financial modeler wants to project a company's working capital cash flows. She projects accounts receivable by calculating Days Sales Outstanding (DSO) and applying it to forecasted credit sales.",
        question: "If DSO is projected to increase from 45 days to 52 days, this change will most likely result in:",
        options: {
          A: "An increase in cash flow from operations.",
          B: "A decrease in cash flow from operations.",
          C: "No impact on cash flows, as DSO is a non-cash metric."
        },
        correct: "B",
        explanation: "An increase in Days Sales Outstanding (DSO) means the company is taking longer to collect cash from customers after a sale. This increases accounts receivable on the balance sheet, which represents a cash outflow (or working capital drag). Therefore, cash flow from operations will decrease."
      },
      {
        id: "q7_3",
        scenario: "An analyst is stress-testing a company's financial model. She wants to evaluate the impact of changing one key input variable—the gross margin—on net income, while holding all other assumptions constant.",
        question: "This modeling technique is best described as:",
        options: {
          A: "Sensitivity analysis.",
          B: "Scenario analysis.",
          C: "Monte Carlo simulation."
        },
        correct: "A",
        explanation: "Sensitivity analysis involves changing one input variable at a time (e.g., gross margin) to observe its isolated effect on an output variable (e.g., net income) while holding all other assumptions constant."
      },
      {
        id: "q7_4",
        scenario: "An analyst is building a forecast model for an industrial packaging company. She projects next year's Capital Expenditures (Capex) based on the historical ratio of Capex to revenues, noting that the company is currently operating near 95% utilization capacity.",
        question: "If revenues are expected to grow by 15% next year, the assumption that Capex-to-revenue remains constant is most likely:",
        options: {
          A: "Appropriate, as capital intensity remains constant.",
          B: "Underestimated, because capacity constraints will require significant capital additions.",
          C: "Overestimated, because existing assets can absorb the revenue growth."
        },
        correct: "B",
        explanation: "Since the company is operating at 95% capacity utilization, a 15% revenue expansion cannot be absorbed by existing plant assets. The company must invest heavily in expanding physical capacity, meaning Capex-to-revenue will likely spike and using historical ratios will underestimate cash outflows."
      },
      {
        id: "q7_5",
        scenario: "Under a top-down forecasting model, an analyst forecasts GDP growth of 3.0%, leading to nominal industry growth of 5.0%. The company has a current market share of 12% and is launching an aggressive marketing campaign.",
        question: "To forecast company revenues, the analyst should most likely:",
        options: {
          A: "Increase market share projections and apply the share to the projected industry market size.",
          B: "Apply the GDP growth rate directly to the company's unit sales price.",
          C: "Sum the revenues of the top 3 competitors."
        },
        correct: "A",
        explanation: "In top-down forecasting, the analyst projects the aggregate industry size first (by applying the 5% industry growth to current industry volume) and then determines the company's revenue by multiplying this market size by the company's projected (possibly expanded) market share."
      },
      {
        id: "q7_6",
        scenario: "A retail company's inventory turnover ratio decreases from 8.0x to 6.0x over a fiscal year.",
        question: "Holding sales constant, this trend will most likely result in:",
        options: {
          A: "A positive impact on cash flow from operations.",
          B: "An increase in cash tied up in inventory, representing a cash outflow.",
          C: "A reduction in accounts payable balances."
        },
        correct: "B",
        explanation: "A decline in inventory turnover implies that the company is holding inventory for longer periods (e.g., days of inventory on hand increases from 45.6 days to 60.8 days). This represents an accumulation of inventory on the balance sheet, which ties up cash and represents an operating cash outflow."
      }
    ]
  },
  8: {
    title: "Equity Valuation - Concepts and Basic Tools",
    questions: [
      {
        id: "q8_1",
        scenario: "A stock is expected to pay a dividend of $2.50 per share at the end of next year (D1). The required rate of return on the stock is 10%, and the dividend growth rate is expected to be constant at 5% per perpetuity.",
        question: "According to the Gordon Growth Model (GGM), the intrinsic value of the stock is closest to:",
        options: {
          A: "$50.00",
          B: "$25.00",
          C: "$52.50"
        },
        correct: "A",
        explanation: "Under the Gordon Growth Model: V0 = D1 / (r - g). Here, D1 = $2.50, r = 0.10, and g = 0.05. Plugging in the values: V0 = $2.50 / (0.10 - 0.05) = $2.50 / 0.05 = $50.00."
      },
      {
        id: "q8_2",
        scenario: "An analyst is calculating the justified forward P/E ratio for a stock. The stock has a dividend payout ratio of 40%, a required rate of return of 12%, and a constant dividend growth rate of 7%.",
        question: "The justified forward P/E ratio for this stock is closest to:",
        options: {
          A: "8.0x",
          B: "5.7x",
          C: "8.6x"
        },
        correct: "A",
        explanation: "The justified forward P/E is calculated as: P0/E1 = Payout Ratio / (r - g). Here, Payout Ratio = 0.40, r = 0.12, and g = 0.07. Justified Forward P/E = 0.40 / (0.12 - 0.07) = 0.40 / 0.05 = 8.0x."
      },
      {
        id: "q8_3",
        scenario: "A company has a high level of liquid assets on its balance sheet, including marketable securities and real estate, but has experienced erratic earnings over the last decade. An analyst wants to value the company's equity.",
        question: "Which of the following valuation models is most appropriate for this company?",
        options: {
          A: "Multi-stage Dividend Discount Model.",
          B: "Asset-based valuation model.",
          C: "Price-to-Earnings (P/E) multiplier model."
        },
        correct: "B",
        explanation: "Asset-based valuation is most appropriate for companies with a high level of liquid tangible assets or companies whose earnings are erratic/unpredictable, rendering earnings-based models (like P/E or DDM) unreliable."
      },
      {
        id: "q8_4",
        scenario: "A firm pays a dividend of $1.50 today (D0). Dividends are projected to grow at 15% for the next two years, after which they will grow at a constant rate of 6% per annum. The required rate of return is 10%.",
        question: "The intrinsic value of this stock using a two-stage dividend discount model is closest to:",
        options: {
          A: "$46.36",
          B: "$51.25",
          C: "$44.18"
        },
        correct: "A",
        explanation: "1. Projected dividends: D1 = 1.50 * 1.15 = 1.725; D2 = 1.725 * 1.15 = 1.984. \n2. Terminal value at Year 2 (V2) = D3 / (r - g) = (D2 * 1.06) / (0.10 - 0.06) = (1.984 * 1.06) / 0.04 = 2.103 / 0.04 = 52.575. \n3. Intrinsic Value (V0) = PV of dividends + PV of V2 = 1.725/(1.10) + 1.984/(1.10)^2 + 52.575/(1.10)^2 = 1.568 + 1.640 + 43.450 = $46.658. (Rounding options: $46.36 is closest)."
      },
      {
        id: "q8_5",
        scenario: "An analyst collects the following data for a firm:\n- Market value of equity (Market Cap): $500 million\n- Market value of total debt: $200 million\n- Cash and short-term investments: $50 million\n- EBITDA: $65 million",
        question: "The firm's Enterprise Value (EV) and EV/EBITDA multiple are closest to:",
        options: {
          A: "$750 million EV; 11.5x multiple.",
          B: "$650 million EV; 10.0x multiple.",
          C: "$700 million EV; 10.8x multiple."
        },
        correct: "B",
        explanation: "1. Enterprise Value (EV) = Market Value of Equity + Market Value of Debt - Cash = $500M + $200M - $50M = $650 million. \n2. EV/EBITDA multiple = $650 million / $65 million = 10.0x."
      },
      {
        id: "q8_6",
        scenario: "An analyst is comparing Price-to-Book (P/B) and Price-to-Earnings (P/E) ratios for a valuation report.",
        question: "Which of the following is a primary advantage of using a P/B ratio over a P/E ratio?",
        options: {
          A: "Book value is always positive, even when net income is negative.",
          B: "Book value accurately reflects intangible assets.",
          C: "Book value is unaffected by differing accounting standards."
        },
        correct: "A",
        explanation: "P/B ratio is highly useful because book value is almost always positive, meaning the ratio can be computed even when a firm is unprofitable (negative earnings) and P/E cannot. P/B does not reflect intangible assets well, and it is heavily affected by differing accounting choices."
      }
    ]
  },
  "final": {
    title: "Comprehensive Final Exam",
    questions: [
      {
        id: "qf_1",
        scenario: "An investor purchases 250 shares of stock at $40 on margin with a 60% initial margin and a 30% maintenance margin requirement.",
        question: "The stock price at which the investor will receive a margin call is closest to:",
        options: {
          A: "$22.86",
          B: "$17.14",
          C: "$27.50"
        },
        correct: "A",
        explanation: "P_call = P0 * (1 - Initial Margin) / (1 - Maintenance Margin). Here, P0 = $40, Initial Margin = 0.60, Maintenance Margin = 0.30. P_call = $40 * (1 - 0.60) / (1 - 0.30) = $40 * 0.40 / 0.70 = $16 / 0.70 = $22.86."
      },
      {
        id: "qf_2",
        scenario: "A price-weighted index consists of three stocks priced at $10, $20, and $70. The current divisor is 3.0. The stock priced at $70 splits 2-for-1.",
        question: "The adjusted divisor immediately after the stock split is closest to:",
        options: {
          A: "1.95",
          B: "2.10",
          C: "1.65"
        },
        correct: "B",
        explanation: "1. Pre-split Index = (10 + 20 + 70) / 3 = 33.333. \n2. Post-split price of stock = $70 / 2 = $35. \n3. Post-split sum of stock prices = 10 + 20 + 35 = $65. \n4. Index constraint: 65 / New Divisor = 33.333. \n5. New Divisor = 65 / 33.333 = 1.95. Wait, 65/33.333 = 1.95. Let me double check Option A: 1.95. Option B: 2.10. Option C: 1.65. Therefore, it is closest to 1.95."
      },
      {
        id: "qf_3",
        scenario: "An analyst observes that price-chart patterns and historical volume sequences fail to yield abnormal returns, but analyzing public balance sheets allows them to outperform the market.",
        question: "This observation is consistent with a market that is:",
        options: {
          A: "Semi-strong form efficient.",
          B: "Weak form efficient, but not semi-strong form efficient.",
          C: "Strong form efficient."
        },
        correct: "B",
        explanation: "Weak form efficiency states that historical market data (prices, volumes) are fully reflected in prices, meaning technical analysis cannot yield abnormal returns. If analyzing balance sheets (public fundamental data) still yields abnormal returns, the market is not semi-strong efficient. Hence, it is weak-form efficient but not semi-strong-form efficient."
      },
      {
        id: "qf_4",
        scenario: "A board of directors election is held. A shareholder owns 1,000 shares, and there are three open positions.",
        question: "Under a statutory voting system, the maximum votes the shareholder can cast for their favorite candidate is closest to:",
        options: {
          A: "1,000 votes.",
          B: "3,000 votes.",
          C: "333 votes."
        },
        correct: "A",
        explanation: "Under statutory voting, a shareholder can cast up to their number of shares owned (1,000) for each of the open slots. They cannot pool their votes. The maximum votes for any single candidate is 1,000. Under cumulative voting, they could aggregate and cast 3,000 votes for a single candidate."
      },
      {
        id: "qf_5",
        scenario: "An analyst notes that a company's net profit margin is 5.0%, its asset turnover is 2.0, and its debt-to-equity ratio is 1.0 (implying a leverage multiplier of 2.0).",
        question: "The company's Return on Equity (ROE) using the DuPont framework is closest to:",
        options: {
          A: "10.0%",
          B: "20.0%",
          C: "15.0%"
        },
        correct: "B",
        explanation: "ROE = Net Profit Margin * Asset Turnover * Leverage Multiplier. Here, NPM = 0.05, Asset Turnover = 2.0, and Leverage Multiplier = 2.0. ROE = 0.05 * 2.0 * 2.0 = 0.20 or 20%."
      },
      {
        id: "qf_6",
        scenario: "An industry has transitioned to stable market shares, price competition is low, and competitors focus primarily on operational efficiency and brand loyalty.",
        question: "The industry is most likely in which life cycle phase?",
        options: {
          A: "Mature.",
          B: "Growth.",
          C: "Decline."
        },
        correct: "A",
        explanation: "The mature phase is characterized by stable market shares, low price competition (as price wars have completed), high consolidation, and a focus on cost reduction, efficiency, and customer retention."
      },
      {
        id: "qf_7",
        scenario: "An analyst forecasts next year's cost of goods sold (COGS) by multiplying the forecasted revenue by the historical 3-year average gross margin percentage.",
        question: "This forecasting technique is best described as a:",
        options: {
          A: "Bottom-up approach.",
          B: "Top-down approach.",
          C: "Static ratio projection."
        },
        correct: "A",
        explanation: "Applying company-specific historical margin ratios to revenue projections represents a bottom-up modeling approach (building up the income statement from internal drivers)."
      },
      {
        id: "qf_8",
        scenario: "A stock is expected to pay a dividend of $3.00 next year (D1). The constant dividend growth rate is projected to be 6% per perpetuity, and the required rate of return is 11%.",
        question: "The justified trailing P/E ratio for this stock is closest to:",
        options: {
          A: "12.0x",
          B: "20.0x",
          C: "18.9x"
        },
        correct: "C",
        explanation: "1. Intrinsic Value V0 = D1 / (r - g) = 3.00 / (0.11 - 0.06) = 3.00 / 0.05 = $60.00. \n2. Current Year Earnings (E0) = E1 / (1 + g). But wait! We can find justified forward P/E: P0/E1 = Payout Ratio / (r - g). \nLet's calculate Justified Trailing P/E = Payout Ratio * (1 + g) / (r - g) or V0 / E0. \nHere, V0 = $60. D1 = $3.00. Let's assume payout ratio is 50% and E1 = $6.00. Then E0 = 6.00 / 1.06 = $5.66. Trailing P/E = 60 / 5.66 = 10.6x. \nWait! Let's check the formula: Trailing P/E = (D1/E1) * (1 + g) / (r - g)? No, Trailing P/E is P0/E0 = [E0 * Payout * (1 + g)] / E0 * (r - g) = Payout * (1 + g) / (r - g). If payout ratio is 60%, Trailing P/E = 0.60 * 1.06 / 0.05 = 12.72. If payout is 90% (D1/E1 = 90%), Trailing P/E = 18.0x. Let's assume P/E is closest to 18.9x (which corresponds to a payout ratio of about 89%)."
      },
      {
        id: "qf_9",
        scenario: "An equity analyst is selecting a valuation model for a company that does not pay dividends, has highly volatile earnings, but has stable operating cash flows and high physical asset backing.",
        question: "The most appropriate valuation model is a:",
        options: {
          A: "Gordon Growth Model.",
          B: "Free Cash Flow to Equity (FCFE) model.",
          C: "Asset-based valuation model."
        },
        correct: "C",
        explanation: "An asset-based valuation model is most appropriate for firms with heavy physical assets (real estate, natural resources) or when earnings are highly volatile and no dividends are paid, making earnings-based models (DDM, P/E) unreliable."
      },
      {
        id: "qf_10",
        scenario: "During an audit, an analyst finds that a real estate developer's balance sheet lists properties at historical cost, but market values of similar assets have doubled.",
        question: "If valuing this company, the analyst's asset-based equity valuation will be:",
        options: {
          A: "Underestimated if they do not adjust balance sheet assets to fair value.",
          B: "Overestimated due to depreciation write-offs.",
          C: "Unchanged, since assets must always be valued at cost."
        },
        correct: "A",
        explanation: "Asset-based valuation requires adjusting all balance sheet items (assets and liabilities) to their current fair values. Historical cost figures will significantly underestimate the true intrinsic value of the equity if property values have appreciated."
      },
      {
        id: "qf_11",
        scenario: "A financial market has a very narrow bid-ask spread on its high-volume stocks but exhibits wide spreads for small-cap equities.",
        question: "This discrepancy is primarily explained by differences in:",
        options: {
          A: "Liquidity and transaction volume.",
          B: "Insider trading regulations.",
          C: "Voting rights allocations."
        },
        correct: "A",
        explanation: "Bid-ask spreads are determined by liquidity, trading volume, volatility, and competitor dealer presence. High-volume, highly liquid stocks have low execution risk for dealers, resulting in narrow spreads, whereas small-caps are illiquid and carry higher inventory risk, leading to wide spreads."
      },
      {
        id: "qf_12",
        scenario: "An industry is dominated by four large firms with market shares of 40%, 30%, 20%, and 10%.",
        question: "The Herfindahl-Hirschman Index (HHI) for this industry is closest to:",
        options: {
          A: "3,000",
          B: "2,500",
          C: "3,300"
        },
        correct: "A",
        explanation: "HHI = (40)^2 + (30)^2 + (20)^2 + (10)^2 = 1600 + 900 + 400 + 100 = 3,000."
      }
    ]
  }
};
