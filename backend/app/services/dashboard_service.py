import numpy as np
from datetime import datetime, timezone, timedelta

def _process_admin_view(all_models: list) -> dict:
    """Processa e retorna os dados para a visão do Administrador."""
    
    if not all_models:
        return {
            "stats": {
                "trained_models": {"value": "0", "description": "Nenhum modelo treinado", "trend": "+0 no último mês"},
                "average_accuracy": {"value": "N/A", "description": "Sem dados de modelo", "trend": ""},
                "average_execution_time": {"value": "N/A", "description": "Sem dados de modelo", "trend": ""}
            },
            "charts": {"model_performance": [], "execution_time": []},
            "tables": {"model_metrics": []}
        }

    now = datetime.now(timezone.utc)
    thirty_days_ago = now - timedelta(days=30)
    sixty_days_ago = now - timedelta(days=60)

    # 1. Processar Métricas e Tempos
    test_metrics = [m.metrics.get('test') for m in all_models if m.metrics and m.metrics.get('test')]
    
    r2_scores = []
    for m in test_metrics:
        if m and m.get('R²') is not None and m.get('R²') != 0:
            r2_scores.append(m.get('R²', 0))
    
    exec_times = [m.metrics.get('time', {}).get('execution_time') for m in all_models if m.metrics.get('time', {}).get('execution_time') is not None]

    # 2. Calcular Estatísticas Principais
    total_models_trained = len(all_models)
    last_trained_model = all_models[-1]
    avg_r2 = np.mean(r2_scores) if r2_scores else 0
    avg_exec_time = np.mean(exec_times) if exec_times else 0
    best_r2_model_data = max(all_models, key=lambda m: m.metrics.get('test', {}).get('R²', -1) if m.metrics.get('test', {}).get('R²') is not None else -1)
    fastest_model_data = min(all_models, key=lambda m: m.metrics.get('time', {}).get('execution_time', float('inf')) if m.metrics.get('time', {}).get('execution_time') is not None else float('inf'))

    # 3. Calcular Tendências (Trends)
    models_current_period = [m for m in all_models if m.createdAt > thirty_days_ago]
    models_previous_period = [m for m in all_models if sixty_days_ago < m.createdAt <= thirty_days_ago] # Corrigido para período anterior

    # Tendência de Acurácia (R²)
    r2_current = [m.metrics.get('test', {}).get('R²', 0) for m in models_current_period if m.metrics.get('test') and m.metrics.get('test', {}).get('R²') is not None and m.metrics.get('test', {}).get('R²') != 0]
    avg_r2_current = np.mean(r2_current) if r2_current else 0
    r2_previous = [m.metrics.get('test', {}).get('R²', 0) for m in models_previous_period if m.metrics.get('test') and m.metrics.get('test', {}).get('R²') is not None and m.metrics.get('test', {}).get('R²') != 0]
    avg_r2_previous = np.mean(r2_previous) if r2_previous else 0
    trend_str_r2 = ""
    if avg_r2_current > 0 and avg_r2_previous > 0:
        difference = (avg_r2_current - avg_r2_previous) / avg_r2_previous
        trend_str_r2 = f"{'+' if difference >= 0 else ''}{difference:.1%}"

    # Tendência de Tempo de Execução
    time_current = [m.metrics.get('time', {}).get('execution_time', 0) for m in models_current_period if m.metrics.get('time') and m.metrics.get('time', {}).get('execution_time') is not None]
    avg_time_current = np.mean(time_current) if time_current else 0
    time_previous = [m.metrics.get('time', {}).get('execution_time', 0) for m in models_previous_period if m.metrics.get('time') and m.metrics.get('time', {}).get('execution_time') is not None]
    avg_time_previous = np.mean(time_previous) if time_previous else 0
    trend_str_time = ""
    if avg_time_current > 0 and avg_time_previous > 0:
        difference = (avg_time_current - avg_time_previous) / avg_time_previous
        trend_str_time = f"{'+' if difference >= 0 else ''}{difference:.1%}"

    # 4. Montar o Dicionário de Resposta
    admin_view = {
        "stats": {
            "trained_models": {
                "value": str(total_models_trained),
                "description": f"Último: {last_trained_model.model_name} ({last_trained_model.createdAt.strftime('%d/%m/%Y')})",
                "trend": f"+{len(models_current_period)} no último mês"
            },
            "average_accuracy": {
                "value": f"{avg_r2:.1%}",
                "description": f"Melhor: {best_r2_model_data.model_name} ({best_r2_model_data.metrics.get('test', {}).get('R²', 0):.2f})",
                "trend": f"{trend_str_r2} nos últimos 30 dias" if trend_str_r2 else ""
            },
            "average_execution_time": {
                "value": f"{avg_exec_time:.2f}s",
                "description": f"Mais rápido: {fastest_model_data.model_name} ({fastest_model_data.metrics.get('time', {}).get('execution_time', 0):.2f}s)",
                "trend": f"{trend_str_time} nos últimos 30 dias" if trend_str_time else ""
            }
        },
        "charts": {
            "model_performance": [{ "model": f"{m.model_name} ({m.attribute})", "r2": m.metrics.get('test', {}).get('R²', 0), "mae": m.metrics.get('test', {}).get('MAE', 0), "rmse": m.metrics.get('test', {}).get('RMSE', 0)} for m in all_models],
            "execution_time": [{"model": f"{m.model_name} ({m.attribute})", "time": m.metrics.get('time', {}).get('execution_time', 0)} for m in all_models],
            "training_curves": [{"model": f"{m.model_name} ({m.attribute})", "train_r2": m.metrics.get('train', {}).get('R²', 0), "validation_r2": m.metrics.get('cv', {}).get('R²', 0), "test_r2": m.metrics.get('test', {}).get('R²', 0)} for m in all_models]
        },
        "tables": { "model_metrics": [{"model": m.model_name, "attribute": m.attribute, "train": m.metrics.get('train', {}), "validation": m.metrics.get('cv', {}), "test": m.metrics.get('test', {})} for m in all_models] },
        "available_models": [{"id": m.id, "name": f"{m.model_name} ({m.attribute})", "model_name": m.model_name, "attribute": m.attribute} for m in all_models]
    }
    return admin_view

def _process_producer_view(all_models: list, all_predictions: list) -> dict:
    """Processa e retorna os dados para a visão do Produtor."""
    if not all_predictions:
        return {
            "stats": {
                "total_predictions": {"value": "0", "description": "Nenhuma predição ainda", "trend": "+0 no último mês"},
                "average_precision": {"value": "N/A", "description": "Aguardando predições", "trend": ""},
                "average_error": {"value": "N/A", "description": "Aguardando predições", "trend": ""}
            },
            "tables": {"prediction_history": []},
            "charts": {"prediction_trend": []}
        }
        
    now = datetime.now(timezone.utc)
    thirty_days_ago = now - timedelta(days=30)
    
    # 1. Processar Estatísticas e Tendências
    predictions_in_last_month = [p for p in all_predictions if p.createdAt > thirty_days_ago]
    total_predictions = len(all_predictions)
    last_prediction = all_predictions[-1]

    r2_values = [m.metrics.get('test', {}).get('R²', 0) for m in all_models if m.metrics.get('test', {}).get('R²') is not None]
    mae_values = [m.metrics.get('test', {}).get('MAE', 0) for m in all_models if m.metrics.get('test', {}).get('MAE') is not None]
    
    avg_precision_proxy = np.mean(r2_values) if r2_values else 0
    avg_error_proxy = np.mean(mae_values) if mae_values else 0
    
    best_precision_model_proxy = None
    lowest_error_model_proxy = None
    
    if all_models:
        valid_models = [m for m in all_models if m.metrics.get('test', {}).get('R²') is not None]
        if valid_models:
            best_precision_model_proxy = max(valid_models, key=lambda m: m.metrics.get('test', {}).get('R²', -1))
        
        valid_models_mae = [m for m in all_models if m.metrics.get('test', {}).get('MAE') is not None]
        if valid_models_mae:
            lowest_error_model_proxy = min(valid_models_mae, key=lambda m: m.metrics.get('test', {}).get('MAE', float('inf')))

    # Reutilizando a lógica de tendência da visão do admin para a precisão (R²)
    admin_trends = _process_admin_view(all_models)
    trend_str_r2 = admin_trends["stats"]["average_accuracy"]["trend"]
    trend_str_mae = "" # O cálculo para MAE não estava no código original, pode ser adicionado se necessário

    # 2. Montar Dicionário de Resposta para Stats e Tabela
    producer_view = {
        "stats": {
            "total_predictions": {
                "value": str(total_predictions), "description": f"Última: {last_prediction.prediction:.2f} ({last_prediction.createdAt.strftime('%d/%m/%y %H:%M')})", "trend": f"+{len(predictions_in_last_month)} no último mês"
            },
            "average_precision": {
                "value": f"{avg_precision_proxy:.1%}", "description": f"Melhor modelo: {best_precision_model_proxy.model_name}" if best_precision_model_proxy else "N/A", "trend": trend_str_r2
            },
            "average_error": {
                "value": f"{avg_error_proxy:.2f}", "description": f"Menor erro: {lowest_error_model_proxy.model_name}" if lowest_error_model_proxy else "N/A", "trend": trend_str_mae
            }
        },
        "tables": { "prediction_history": [{"id": p.id, "name": p.name, "model": p.model_name, "value": p.prediction, "timestamp": p.createdAt.isoformat()} for p in reversed(all_predictions[-10:])] },
        "charts": {}
    }

    # 3. Processar Dados para o Gráfico de Tendência de Predições
    models_metrics_map = {m.model_name: m.metrics.get('test', {}) for m in all_models}
    predictions_by_day = {}
    for p in all_predictions:
        date_str = p.createdAt.strftime('%Y-%m-%d')
        if date_str not in predictions_by_day:
            predictions_by_day[date_str] = []
        predictions_by_day[date_str].append(p)

    prediction_trend_data = []
    for date, preds in sorted(predictions_by_day.items()):
        daily_accuracies = [models_metrics_map.get(p.model_name, {}).get('R²', 0) for p in preds if p.model_name in models_metrics_map]
        avg_daily_accuracy = np.mean(daily_accuracies) if daily_accuracies else 0
        prediction_trend_data.append({"date": date, "predictions": len(preds), "r2": avg_daily_accuracy * 100})

    producer_view["charts"]["prediction_trend"] = prediction_trend_data
    
    return producer_view

def get_processed_dashboard_views(all_models: list, all_predictions: list) -> tuple[dict, dict]:
    """
    Função principal que orquestra o processamento para as visões de admin e produtor.
    """
    admin_view = _process_admin_view(all_models)
    producer_view = _process_producer_view(all_models, all_predictions)
    
    return admin_view, producer_view