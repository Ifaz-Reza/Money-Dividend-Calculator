document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsSection = document.getElementById('results');
    
    calculateBtn.addEventListener('click', calculateShares);
    
    function calculateShares() {
        // Get input values
        const m_nishan = parseFloat(document.getElementById('m_nishan').value) || 0;
        const f_nishan = parseFloat(document.getElementById('f_nishan').value) || 0;
        
        const m_rafi = parseFloat(document.getElementById('m_rafi').value) || 0;
        const f_rafi = parseFloat(document.getElementById('f_rafi').value) || 0;
        
        const m_ifaz = parseFloat(document.getElementById('m_ifaz').value) || 0;
        const f_ifaz = parseFloat(document.getElementById('f_ifaz').value) || 0;
        
        // Calculate totals
        const totalMeals = f_nishan + f_rafi + f_ifaz;
        const totalMoney = m_nishan + m_rafi + m_ifaz;
        
        // Calculate shares
        let share_nishan, share_rafi, share_ifaz;
        let money_nishan, money_rafi, money_ifaz;
        
        if (totalMeals > 0) {
            share_nishan = (f_nishan / totalMeals) * totalMoney;
            share_rafi = (f_rafi / totalMeals) * totalMoney;
            share_ifaz = (f_ifaz / totalMeals) * totalMoney;
            
            money_nishan = m_nishan - Math.round(share_nishan);
            money_rafi = m_rafi - Math.round(share_rafi);
            money_ifaz = m_ifaz - Math.round(share_ifaz);
        } else {
            // Handle case where no meals were taken
            money_nishan = m_nishan;
            money_rafi = m_rafi;
            money_ifaz = m_ifaz;
        }
        
        // Display results
        displayResult('nishan', money_nishan, m_nishan, Math.round(share_nishan || 0));
        displayResult('rafi', money_rafi, m_rafi, Math.round(share_rafi || 0));
        displayResult('ifaz', money_ifaz, m_ifaz, Math.round(share_ifaz || 0));
        
        // Show results section
        resultsSection.style.display = 'block';
    }
    
    function displayResult(name, amount, paid, share) {
        const resultElement = document.getElementById(`result-${name}`);
        const amountElement = document.getElementById(`money-${name}`);
        const explainElement = document.getElementById(`explain-${name}`);
        
        // Update amount display
        amountElement.textContent = Math.abs(amount);
        
        // Update explanation
        if (amount > 0) {
            explainElement.textContent = `Paid TK${paid} and should have paid TK${share}. Should receive TK${amount}.`;
            resultElement.className = 'result positive';
        } else if (amount < 0) {
            explainElement.textContent = `Paid TK${paid} but should have paid TK${share}. Owes TK${Math.abs(amount)}.`;
            resultElement.className = 'result negative';
        } else {
            explainElement.textContent = `Paid TK${paid} which matches the calculated share of TK${share}. All settled!`;
            resultElement.className = 'result neutral';
        }
    }
});
